import { type NextRequest, NextResponse } from "next/server"
import { geminiAPI } from "@/lib/gemini-api"
import { llamaAPI } from "@/lib/llama-api"

export async function POST(request: NextRequest) {
  console.log("✍️ COPY GENERATION API: Request received")

  try {
    const body = await request.json()
    console.log("✍️ COPY GENERATION API: Request body:", body)

    const { type, platform, topic, tone, keywords } = body

    // Validate required fields
    if (!type || !topic) {
      console.error("✍️ COPY GENERATION API: Missing required fields")
      return NextResponse.json({ error: "Type and topic are required" }, { status: 400 })
    }

    console.log("✍️ COPY GENERATION API: Starting generation with validated params")

    let generatedCopy: string
    let apiUsed: string

    // Try Gemini API first
    try {
      console.log("✍️ COPY GENERATION API: Attempting Gemini API...")
      generatedCopy = await geminiAPI.generateCopy({
        type,
        platform,
        topic,
        tone,
        keywords,
      })
      apiUsed = "Gemini"
      console.log("🟢 COPY GENERATION API: Gemini API succeeded!")
    } catch (geminiError) {
      console.error("🔴 COPY GENERATION API: Gemini API failed:", geminiError)

      // Fallback to LLaMA API
      try {
        console.log("✍️ COPY GENERATION API: Attempting LLaMA API fallback...")
        generatedCopy = await llamaAPI.generateCopy({
          type,
          platform,
          topic,
          tone,
          keywords,
        })
        apiUsed = "LLaMA (fallback)"
        console.log("🟢 COPY GENERATION API: LLaMA API succeeded!")
      } catch (llamaError) {
        console.error("🔴 COPY GENERATION API: Both APIs failed:", llamaError)
        throw new Error("Both Gemini and LLaMA APIs failed")
      }
    }

    console.log(`✍️ COPY GENERATION API: Final result - API used: ${apiUsed}`)
    console.log(`✍️ COPY GENERATION API: Generated content length: ${generatedCopy.length}`)

    return NextResponse.json({
      success: true,
      content: generatedCopy,
      apiUsed: apiUsed,
      contentLength: generatedCopy.length,
    })
  } catch (error) {
    console.error("🔴 COPY GENERATION API: Unexpected error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate copy. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
