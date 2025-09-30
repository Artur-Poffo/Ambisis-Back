export interface UseCase<i, o> {
  execute(params: i): Promise<o>;
}
