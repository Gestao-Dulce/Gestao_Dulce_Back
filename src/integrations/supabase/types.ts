export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          contato: string | null
          cpf_cnpj: string | null
          created_at: string
          id: string
          localizacao: string | null
          nome: string
          numero: string | null
          rua: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          contato?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          id?: string
          localizacao?: string | null
          nome: string
          numero?: string | null
          rua?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          contato?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          id?: string
          localizacao?: string | null
          nome?: string
          numero?: string | null
          rua?: string | null
        }
        Relationships: []
      }
      contas_a_pagar: {
        Row: {
          categoria: Database["public"]["Enums"]["categoria_conta"]
          created_at: string
          descricao: string | null
          finalizado_em: string | null
          fornecedor: string
          funcionario_cargo: string | null
          funcionario_documento: string | null
          funcionario_nome: string | null
          grupo_recorrencia: string | null
          id: string
          recorrente: boolean
          status: Database["public"]["Enums"]["status_conta"]
          valor: number
          vencimento: string
        }
        Insert: {
          categoria?: Database["public"]["Enums"]["categoria_conta"]
          created_at?: string
          descricao?: string | null
          finalizado_em?: string | null
          fornecedor: string
          funcionario_cargo?: string | null
          funcionario_documento?: string | null
          funcionario_nome?: string | null
          grupo_recorrencia?: string | null
          id?: string
          recorrente?: boolean
          status?: Database["public"]["Enums"]["status_conta"]
          valor: number
          vencimento: string
        }
        Update: {
          categoria?: Database["public"]["Enums"]["categoria_conta"]
          created_at?: string
          descricao?: string | null
          finalizado_em?: string | null
          fornecedor?: string
          funcionario_cargo?: string | null
          funcionario_documento?: string | null
          funcionario_nome?: string | null
          grupo_recorrencia?: string | null
          id?: string
          recorrente?: boolean
          status?: Database["public"]["Enums"]["status_conta"]
          valor?: number
          vencimento?: string
        }
        Relationships: []
      }
      custos: {
        Row: {
          categoria: string
          created_at: string
          data: string
          descricao: string
          finalizado_em: string | null
          id: string
          recorrente: boolean
          valor: number
        }
        Insert: {
          categoria?: string
          created_at?: string
          data?: string
          descricao: string
          finalizado_em?: string | null
          id?: string
          recorrente?: boolean
          valor: number
        }
        Update: {
          categoria?: string
          created_at?: string
          data?: string
          descricao?: string
          finalizado_em?: string | null
          id?: string
          recorrente?: boolean
          valor?: number
        }
        Relationships: []
      }
      custos_categorias: {
        Row: {
          created_at: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          created_at: string
          id: string
          nome: string
          observacao: string | null
          unidade: string
          updated_at: string
          valor: number
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          observacao?: string | null
          unidade?: string
          updated_at?: string
          valor?: number
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          observacao?: string | null
          unidade?: string
          updated_at?: string
          valor?: number
        }
        Relationships: []
      }
      venda_itens: {
        Row: {
          created_at: string
          id: string
          produto: string
          quantidade: number
          unidade: string
          valor_unitario: number
          venda_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          produto: string
          quantidade: number
          unidade?: string
          valor_unitario: number
          venda_id: string
        }
        Update: {
          created_at?: string
          id?: string
          produto?: string
          quantidade?: number
          unidade?: string
          valor_unitario?: number
          venda_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venda_itens_venda_id_fkey"
            columns: ["venda_id"]
            isOneToOne: false
            referencedRelation: "vendas"
            referencedColumns: ["id"]
          },
        ]
      }
      vendas: {
        Row: {
          cliente_id: string
          created_at: string
          data: string
          data_pagamento: string | null
          desconto: number
          forma_pagamento: Database["public"]["Enums"]["forma_pagamento"]
          id: string
          nota_fiscal: string | null
          produto: string | null
          quantidade: number | null
          status_pagamento: Database["public"]["Enums"]["status_pagamento"]
          valor_total: number
          valor_unitario: number | null
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data?: string
          data_pagamento?: string | null
          desconto?: number
          forma_pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          id?: string
          nota_fiscal?: string | null
          produto?: string | null
          quantidade?: number | null
          status_pagamento?: Database["public"]["Enums"]["status_pagamento"]
          valor_total: number
          valor_unitario?: number | null
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data?: string
          data_pagamento?: string | null
          desconto?: number
          forma_pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          id?: string
          nota_fiscal?: string | null
          produto?: string | null
          quantidade?: number | null
          status_pagamento?: Database["public"]["Enums"]["status_pagamento"]
          valor_total?: number
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          id: string
          email: string
          senha_hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          senha_hash?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          senha_hash?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categoria_conta: "fornecedor" | "folha_pagamento" | "outros"
      categoria_custo: "fixo" | "variavel"
      forma_pagamento: "dinheiro" | "pix" | "cartao" | "faturado" | "boleto"
      status_conta: "pendente" | "pago"
      status_pagamento: "pago" | "pendente" | "atrasado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categoria_conta: ["fornecedor", "folha_pagamento", "outros"],
      categoria_custo: ["fixo", "variavel"],
      forma_pagamento: ["dinheiro", "pix", "cartao", "faturado", "boleto"],
      status_conta: ["pendente", "pago"],
      status_pagamento: ["pago", "pendente", "atrasado"],
    },
  },
} as const
