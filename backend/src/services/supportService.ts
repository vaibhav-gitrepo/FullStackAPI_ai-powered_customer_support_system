export const supportService = {
  async handle(conversationId: string, message: string) {
    return { content: `Support Agent: I see you asked "${message}". Let me assist you.` };
  }
};
