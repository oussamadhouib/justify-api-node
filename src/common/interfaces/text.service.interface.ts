export interface ITextService {
  justify(words: string[], L: number): string[];
}

export const TEXT_SERVICE_TOKEN = Symbol('TextService');
