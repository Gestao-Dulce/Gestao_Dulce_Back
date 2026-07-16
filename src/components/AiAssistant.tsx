import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Mic, MicOff, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { apiAI, ChatMessage } from "@/lib/api";
import { toast } from "sonner";

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  // Setup Web Speech API for voice recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = "pt-BR";
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };

      rec.onerror = (event: any) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        if (event.error !== "no-speech") {
          toast.error("Erro ao reconhecer a voz. Tente novamente.");
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const newMessages = [...messages, { role: "user", content: userMessage } as ChatMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Send message to Express backend API
      const res = await apiAI.chat(userMessage, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: res.text }]);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao obter resposta do assistente.");
      // Remove user's last message if failed, or just show error
    } finally {
      setLoading(false);
    }
  };

  // Simple Markdown formatter for rendering AI bold and lists
  const formatText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let formatted = line;

      // Handle Bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      formatted = formatted.replace(boldRegex, "<strong>$1</strong>");

      // Handle Bullet points starting with - or *
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const content = line.trim().substring(2);
        return (
          <li
            key={idx}
            className="ml-4 list-disc"
            dangerouslySetInnerHTML={{ __html: content.replace(boldRegex, "<strong>$1</strong>") }}
          />
        );
      }

      return (
        <p
          key={idx}
          className="mb-1 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {open && (
        <Card className="w-[360px] sm:w-[420px] h-[500px] mb-4 flex flex-col shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="size-5" />
              <div>
                <CardTitle className="text-sm font-semibold">Assistente Lucelian</CardTitle>
                <span className="text-[10px] opacity-80 block">Online</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 size-8"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-2">
                <Bot className="size-10 mx-auto text-primary opacity-60 animate-bounce" />
                <p className="text-xs font-semibold text-foreground">Olá! Sou o assistente da Doces Lucelian.</p>
                <p className="text-[11px] text-muted-foreground max-w-[80%] mx-auto">
                  Você pode me fazer perguntas sobre vendas, produtos cadastrados, contas a pagar e clientes.
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "size-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs",
                    msg.role === "user" ? "bg-primary" : "bg-zinc-600"
                  )}
                >
                  {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg text-sm shadow-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-card text-foreground rounded-tl-none border border-border"
                  )}
                >
                  {formatText(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 mr-auto max-w-[85%] items-center">
                <div className="size-7 rounded-full flex items-center justify-center shrink-0 bg-zinc-600 text-white">
                  <Bot className="size-4" />
                </div>
                <div className="bg-card text-foreground p-3 rounded-lg border border-border rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground animate-pulse">Pesquisando dados...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-card rounded-b-lg">
            <form onSubmit={handleSend} className="flex gap-1.5 w-full items-center">
              <Input
                placeholder="Pergunte sobre faturamento, vendas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 h-9"
              />
              
              {/* Voice recognition button */}
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleRecording}
                disabled={loading}
                className={cn("size-9 shrink-0", isRecording && "animate-pulse")}
                title={isRecording ? "Parar gravação" : "Digitar por voz"}
              >
                {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </Button>

              <Button type="submit" size="icon" disabled={!input.trim() || loading} className="size-9 shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Action Button */}
      <Button
        size="icon"
        className={cn(
          "size-14 rounded-full shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300",
          open ? "bg-zinc-600 hover:bg-zinc-700" : "bg-primary hover:bg-primary/90"
        )}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </Button>
    </div>
  );
}
