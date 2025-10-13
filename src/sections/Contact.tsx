export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 border-t border-black/10">
      <h2 className="uppercase tracking-[0.25em] text-xs text-zinc-500">
        Say Hello
      </h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-zinc-700">
            Let’s make it happen. Email works best:
          </p>
          <p className="mt-2">
            <a
              className="text-[var(--brand)] underline decoration-dotted"
              href="mailto:goekmeroz@gmail.com"
            >
              goekmeroz@gmail.com
            </a>
          </p>
        </div>
        <form
          action="https://formspree.io/f/your-id"
          method="POST"
          className="grid gap-3"
        >
          <input
            name="name"
            placeholder="Your name"
            className="border px-3 py-2 rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="border px-3 py-2 rounded h-28"
            required
          />
          <button
            className="bg-[var(--brand)] text-white px-4 py-2 rounded-xl hover:opacity-90"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
