import { sleep } from "@/app/util/sleep";

export async function POST(request: Request) {
  const chunks = ["one", "two", "three", "four", "five"];

  const stream = new ReadableStream({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(chunk);
        await sleep(2000);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
