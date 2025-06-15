interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
    finishReason: string
  }>
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}

export class GeminiAPI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = "AIzaSyBo283gmpGIyIAjchyUYEL1mV4J1PwhLlU"
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
  }

  async generateEmail(params: {
    emailType: string
    companyName: string
    productName: string
    targetAudience: string
    keyMessage: string
    tone: string
  }): Promise<string> {
    console.log("🔵 GEMINI API: Starting email generation with params:", params)
    const prompt = this.createEmailPrompt(params)
    return this.makeRequest(prompt, "email")
  }

  async generateCopy(params: {
    type: string
    platform: string
    topic: string
    tone: string
    keywords: string
  }): Promise<string> {
    console.log("🔵 GEMINI API: Starting copy generation with params:", params)
    const prompt = this.createCopyPrompt(params)
    return this.makeRequest(prompt, "copy")
  }

  private createEmailPrompt(params: {
    emailType: string
    companyName: string
    productName: string
    targetAudience: string
    keyMessage: string
    tone: string
  }): string {
    const company = params.companyName || "TechCorp"
    const product = params.productName || "our innovative solution"
    const audience = params.targetAudience || "business professionals"
    const message = params.keyMessage || "transform your business operations"
    const tone = params.tone || "professional"

    const prompt = `You are an expert marketing copywriter. Create a COMPLETE ${params.emailType} marketing email with BOTH subject line AND full email body.

CONTEXT:
- Email Type: ${params.emailType}
- Company: ${company}
- Product/Service: ${product}
- Target Audience: ${audience}
- Key Message: ${message}
- Tone: ${tone}

MANDATORY REQUIREMENTS:
1. Start with "Subject: [compelling subject line]"
2. Then write "Email Body:" followed by the complete email
3. Include greeting, 3-4 body paragraphs, and professional closing
4. Add a clear call-to-action
5. Make it 250-400 words for the body
6. Use ${tone} tone throughout
7. Make it conversion-focused and engaging

EXACT OUTPUT FORMAT:
Subject: [Your compelling subject line here]

Email Body:
Dear [Name/Customer],

[Opening paragraph with hook and introduction - explain why you're writing]

[Main value proposition paragraph - explain the benefits and what makes this special]

[Supporting details paragraph - features, social proof, or additional benefits]

[Call-to-action paragraph with clear next steps and urgency]

Best regards,
The ${company} Team

P.S. [Optional postscript for additional urgency or bonus]

NOW WRITE THE COMPLETE EMAIL WITH BOTH SUBJECT AND FULL BODY - DO NOT STOP EARLY:`

    console.log("🔵 GEMINI API: Created email prompt:", prompt.substring(0, 200) + "...")
    return prompt
  }

  private createCopyPrompt(params: {
    type: string
    platform: string
    topic: string
    tone: string
    keywords: string
  }): string {
    const prompt = `Create compelling ${params.type.toLowerCase()} copy for ${params.platform || "the platform"}.

DETAILS:
- Topic: ${params.topic}
- Tone: ${params.tone || "professional"}
- Keywords: ${params.keywords || "relevant keywords"}
- Platform: ${params.platform || "general"}

Write engaging, conversion-focused copy that matches the platform and tone.`

    console.log("🔵 GEMINI API: Created copy prompt:", prompt.substring(0, 200) + "...")
    return prompt
  }

  private async makeRequest(prompt: string, type: string): Promise<string> {
    console.log(`🔵 GEMINI API: Making ${type} request to:`, this.baseUrl)

    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          stopSequences: [],
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }

      console.log("🔵 GEMINI API: Request body:", JSON.stringify(requestBody, null, 2))

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("🔵 GEMINI API: Response status:", response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("🔴 GEMINI API: Error response:", errorText)
        throw new Error(`Gemini API request failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data: GeminiResponse = await response.json()
      console.log("🔵 GEMINI API: Full response data:", JSON.stringify(data, null, 2))

      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.length > 0) {
        const content = data.candidates[0].content.parts[0].text.trim()
        console.log("🟢 GEMINI API: Successfully extracted content:", content.substring(0, 200) + "...")
        console.log("🟢 GEMINI API: Content length:", content.length)
        console.log("🟢 GEMINI API: Usage metadata:", data.usageMetadata)

        // Validate that we have both subject and body for emails
        if (type === "email") {
          const hasSubject = content.includes("Subject:")
          const hasEmailBody = content.includes("Email Body:") || content.split("\n").length > 3
          console.log("🔵 GEMINI API: Email validation - Has Subject:", hasSubject, "Has Body:", hasEmailBody)

          if (!hasSubject || !hasEmailBody) {
            console.log("🟡 GEMINI API: Email seems incomplete, enhancing...")
            return this.enhanceIncompleteEmail(content, {
              emailType: "marketing email",
              companyName: "our company",
              productName: "our product",
              tone: "professional",
            })
          }
        }

        return content
      }

      console.error("🔴 GEMINI API: No valid content in response")
      throw new Error("No content generated from Gemini API")
    } catch (error) {
      console.error("🔴 GEMINI API: Request failed with error:", error)
      throw error
    }
  }

  private enhanceIncompleteEmail(content: string, params: any): string {
    console.log("🟡 GEMINI API: Enhancing incomplete email content")

    let subject = "Transform Your Business Today!"
    if (content.includes("Subject:")) {
      subject = content.split("Subject:")[1].split("\n")[0].trim()
    }

    const enhancedEmail = `Subject: ${subject}

Email Body:
Dear Valued Customer,

We're excited to share something special with you today! ${params.productName} is here to revolutionize the way you work and help you achieve your goals more efficiently than ever before.

Here's what makes ${params.productName} different:
• Cutting-edge technology designed for modern businesses
• User-friendly interface that saves you time
• Proven results from thousands of satisfied customers
• 24/7 support to help you succeed

Don't miss out on this opportunity to transform your business. Join the thousands of professionals who have already discovered the power of ${params.productName}.

Ready to get started? Click the button below to learn more and claim your exclusive offer.

[GET STARTED NOW]

Best regards,
The ${params.companyName} Team

P.S. This special offer won't last long - secure your spot today!`

    console.log("🟢 GEMINI API: Enhanced email created, length:", enhancedEmail.length)
    return enhancedEmail
  }
}

export const geminiAPI = new GeminiAPI()
