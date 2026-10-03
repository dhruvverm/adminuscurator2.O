import { siteConfig } from "@/config/site";

/**
 * Floating WhatsApp button, fixed to the bottom-right on every marketing page.
 * Renders nothing until a number is set in siteConfig.contact.whatsapp.
 */
export function WhatsAppButton() {
  const number = (siteConfig.contact.whatsapp || "").replace(/\D/g, "");
  if (!number) return null;

  const text = siteConfig.contact.whatsappMessage || "";
  const href = `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-track="cta_click"
      data-track-label="whatsapp_fab"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.004 2.667c-7.364 0-13.333 5.969-13.333 13.333 0 2.349.613 4.646 1.778 6.671L2.667 29.333l6.84-1.793a13.27 13.27 0 0 0 6.497 1.654h.006c7.36 0 13.33-5.969 13.33-13.333 0-3.563-1.387-6.912-3.906-9.432-2.52-2.52-5.868-3.762-9.43-3.762Zm0 24.254h-.005a11.08 11.08 0 0 1-5.645-1.546l-.405-.24-4.058 1.064 1.083-3.955-.264-.42a11.03 11.03 0 0 1-1.69-5.878c0-6.12 4.98-11.1 11.104-11.1 2.965 0 5.751 1.155 7.846 3.252a11.02 11.02 0 0 1 3.25 7.853c0 6.121-4.98 11.1-11.11 11.1Zm6.09-8.312c-.334-.167-1.975-.975-2.281-1.086-.306-.111-.529-.167-.751.167-.223.334-.863 1.086-1.058 1.308-.195.223-.39.251-.724.084-.334-.167-1.41-.52-2.686-1.658-.993-.886-1.663-1.979-1.858-2.313-.195-.334-.021-.514.146-.681.15-.149.334-.39.501-.585.167-.195.223-.334.334-.557.111-.223.056-.418-.028-.585-.084-.167-.751-1.81-1.029-2.478-.271-.651-.546-.563-.751-.574l-.64-.011c-.223 0-.585.084-.891.418-.306.334-1.169 1.142-1.169 2.785 0 1.643 1.197 3.23 1.364 3.453.167.223 2.357 3.6 5.712 5.047.798.345 1.42.551 1.905.705.8.254 1.528.218 2.104.132.642-.096 1.975-.807 2.253-1.587.278-.779.278-1.447.195-1.587-.084-.139-.306-.223-.64-.39Z"
        />
      </svg>
    </a>
  );
}
