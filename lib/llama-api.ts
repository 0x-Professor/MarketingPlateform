interface LlamaMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface LlamaResponse {
  choices: Array<{
    delta?: {
      content?: string
    }
    message?: {
      content: string
    }
  }>
}

export class LlamaAPI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey =
      "cpk_ac295727316244df9f0b15032aac7f5f.0e4c136833ce5488ad2b68a2e843d103.e5xUODLS9PIiMHpiycOYkTMStKh6FYmY"
    this.baseUrl = "https://llm.chutes.ai/v1/chat/completions"
  }

  async generateEmail(params: {
    emailType: string
    companyName: string
    productName: string
    targetAudience: string
    keyMessage: string
    tone: string
  }): Promise<string> {
    console.log("🟠 LLAMA API: Starting email generation with params:", params)
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
    console.log("🟠 LLAMA API: Starting copy generation with params:", params)
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

    const prompt = `Create a complete ${params.emailType} marketing email. You must write BOTH the subject line AND the full email body.

CONTEXT:
- Email Type: ${params.emailType}
- Company: ${company}
- Product/Service: ${product}
- Target Audience: ${audience}
- Key Message: ${message}
- Tone: ${tone}

MANDATORY REQUIREMENTS:
1. Start with "Subject: [your subject line]"
2. Then write "Email Body:" followed by the complete email
3. Include greeting, multiple body paragraphs, and closing
4. Add a clear call-to-action
5. Make it 200-400 words for the body
6. Use ${tone} tone throughout

NOW WRITE THE COMPLETE EMAIL WITH BOTH SUBJECT AND FULL BODY:`

    console.log("🟠 LLAMA API: Created email prompt:", prompt.substring(0, 200) + "...")
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

Write engaging, conversion-focused copy:`

    console.log("🟠 LLAMA API: Created copy prompt:", prompt.substring(0, 200) + "...")
    return prompt
  }

  private async makeRequest(prompt: string, type: string): Promise<string> {
    console.log(`🟠 LLAMA API: Making ${type} request to:`, this.baseUrl)

    try {
      const messages: LlamaMessage[] = [
        {
          role: "system",
          content: `You are an expert marketing copywriter. You ALWAYS write complete, detailed marketing content. When asked for an email, you MUST provide both subject line AND full email body.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ]

      const requestBody = {
        model: "chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages,
        stream: false,
        max_tokens: 2000,
        temperature: 0.8,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      }

      console.log("🟠 LLAMA API: Request body:", JSON.stringify(requestBody, null, 2))

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("🟠 LLAMA API: Response status:", response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("🔴 LLAMA API: Error response:", errorText)
        throw new Error(`LLaMA API request failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data: LlamaResponse = await response.json()
      console.log("🟠 LLAMA API: Full response data:", JSON.stringify(data, null, 2))

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const content = data.choices[0].message.content.trim()
        console.log("🟢 LLAMA API: Successfully extracted content:", content.substring(0, 200) + "...")
        console.log("🟢 LLAMA API: Content length:", content.length)

        // Validate email content
        if (type === "email") {
          const hasSubject = content.includes("Subject:")
          const hasEmailBody = content.includes("Email Body:") || content.split("\n").length > 3
          console.log("🟠 LLAMA API: Email validation - Has Subject:", hasSubject, "Has Body:", hasEmailBody)
        }

        return content
      }

      console.error("🔴 LLAMA API: No valid content in response")
      throw new Error("No content generated from LLaMA API")
    } catch (error) {
      console.error("🔴 LLAMA API: Request failed with error:", error)
      throw error
    }
  }
}

export const llamaAPI = new LlamaAPI()
