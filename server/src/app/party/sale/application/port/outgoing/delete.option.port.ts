export const DELETE_OPTION_PORT = Symbol('DELETE_OPTION_PORT');

export interface DeleteOptionPort {
  deleteOption(optionId: number): Promise<void>;
}
