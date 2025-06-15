import { type NextRequest, NextResponse } from "next/server"
import { geminiAPI } from "@/lib/gemini-api"
import { llamaAPI } from "@/lib/llama-api"

export async function POST(request: NextRequest) {
  console.log("📧 EMAIL GENERATION API: Request received")

  try {
    const body = await request.json()
    console.log("📧 EMAIL GENERATION API: Request body:", body)

    const { emailType, companyName, productName, targetAudience, keyMessage, tone } = body

    // Validate required fields
    if (!emailType) {
      console.error("📧 EMAIL GENERATION API: Missing email type")
      return NextResponse.json({ error: "Email type is required" }, { status: 400 })
    }

    console.log("📧 EMAIL GENERATION API: Starting generation with validated params")

    let generatedEmail: string
    let apiUsed: string

    // Try Gemini API first
    try {
      console.log("📧 EMAIL GENERATION API: Attempting Gemini API...")
      generatedEmail = await geminiAPI.generateEmail({
        emailType,
        companyName,
        productName,
        targetAudience,
        keyMessage,
        tone,
      })
      apiUsed = "Gemini"
      console.log("🟢 EMAIL GENERATION API: Gemini API succeeded!")
    } catch (geminiError) {
      console.error("🔴 EMAIL GENERATION API: Gemini API failed:", geminiError)

      // Fallback to LLaMA API
      try {
        console.log("📧 EMAIL GENERATION API: Attempting LLaMA API fallback...")
        generatedEmail = await llamaAPI.generateEmail({
          emailType,
          companyName,
          productName,
          targetAudience,
          keyMessage,
          tone,
        })
        apiUsed = "LLaMA (fallback)"
        console.log("🟢 EMAIL GENERATION API: LLaMA API succeeded!")
      } catch (llamaError) {
        console.error("🔴 EMAIL GENERATION API: LLaMA API also failed:", llamaError)

        // Final fallback - generate template email
        console.log("📧 EMAIL GENERATION API: Using template fallback...")
        generatedEmail = generateFallbackEmail({
          emailType,
          companyName: companyName || "our company",
          productName: productName || "our product",
          targetAudience: targetAudience || "valued customers",
          keyMessage: keyMessage || "discover something amazing",
          tone: tone || "professional",
        })
        apiUsed = "Template (both APIs failed)"
        console.log("🟢 EMAIL GENERATION API: Template fallback generated")
      }
    }

    console.log(`📧 EMAIL GENERATION API: Final result - API used: ${apiUsed}`)
    console.log(`📧 EMAIL GENERATION API: Generated content length: ${generatedEmail.length}`)
    console.log(`📧 EMAIL GENERATION API: Generated content preview: ${generatedEmail.substring(0, 300)}...`)

    return NextResponse.json({
      success: true,
      content: generatedEmail,
      apiUsed: apiUsed,
      contentLength: generatedEmail.length,
    })
  } catch (error) {
    console.error("🔴 EMAIL GENERATION API: Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate email. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function generateFallbackEmail(params: {
  emailType: string
  companyName: string
  productName: string
  targetAudience: string
  keyMessage: string
  tone: string
}): string {
  console.log("📧 FALLBACK EMAIL: Generating template with params:", params)

  const email = `Subject: ${params.emailType} - Transform Your Business with ${params.productName}

Email Body:
Dear ${params.targetAudience},

We hope this email finds you well. We're excited to share something special that could revolutionize the way you work.

${params.keyMessage} - and we believe ${params.productName} is exactly what you need to achieve your goals more efficiently than ever before.

Here's what makes ${params.productName} different:
• Cutting-edge technology designed for modern businesses
• User-friendly interface that saves you time and money
• Proven results from thousands of satisfied customers
• Expert support to help you succeed every step of the way

Don't miss out on this opportunity to transform your business operations. Join the thousands of professionals who have already discovered the power of ${params.productName}.

Ready to get started? Click the button below to learn more and claim your exclusive offer.

[GET STARTED NOW]

Best regards,
The ${params.companyName} Team

P.S. This exclusive opportunity won't last long - secure your spot today and start seeing results immediately!`

  console.log("📧 FALLBACK EMAIL: Generated template, length:", email.length)
  return email
}
