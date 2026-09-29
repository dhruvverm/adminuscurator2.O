"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Software } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { isDirectFile, isExternalUrl, withBasePath } from "@/lib/urls";
import { SoftwareLogo } from "./SoftwareLogo";
import { DESKTOP_OS, DEVICES, availableOs, downloadUrl, formatDate, isDeviceAvailable, platformSize, type DesktopOs, type Device } from "./platforms";

type Step = "device" | "confirm";

/** Best guess at the visitor's current device, used only as a hint. */
type Detected = { device: Device; os: DesktopOs | null; appleMobile: boolean };

function detectDevice(): Detected {
  const ua = navigator.userAgent;
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  const appleMobile = /iPhone|iPad|iPod/.test(ua) || iPadOS;
  if (/iPad|Tablet/.test(ua) || iPadOS || (/Android/.test(ua) && !/Mobile/.test(ua))) return { device: "tablet", os: null, appleMobile };
  if (/iPhone|iPod|Android.*Mobile|Mobile/.test(ua)) return { device: "mobile", os: null, appleMobile };
  return { device: "desktop", os: /Mac/.test(ua) ? "mac" : /Win/.test(ua) ? "windows" : null, appleMobile };
}

/** Short install help based on the file type being downloaded. */
function InstallTip({ url, isAppleMobile }: { url: string | null; isAppleMobile: boolean }) {
  if (!url) return null;
  const path = url.split(/[?#]/)[0].toLowerCase();
  const tip = (tone: "info" | "warning", body: React.ReactNode) => (
    <div className={`alert alert--${tone} install-tip`}>
      <Icon name="helpCircle" size={18} />
      <div>{body}</div>
    </div>
  );
  if (path.endsWith(".apk")) {
    return isAppleMobile
      ? tip("warning", <>This is an Android app and can&apos;t be installed on iPhone or iPad.</>)
      : tip("info", <>Android app (APK). After downloading, open the file to install it. If Android asks, allow installing apps from your browser.</>);
  }
  if (path.endsWith(".exe")) {
    return tip(
      "info",
      <>
        Windows installer. Run the downloaded file and follow the steps. If <strong>&ldquo;Windows protected your PC&rdquo;</strong> appears, click <strong>More info → Run anyway</strong>.
      </>,
    );
  }
  if (path.endsWith(".dmg")) {
    return tip(
      "info",
      <>
        Open the downloaded file and drag the app into <strong>Applications</strong>. The first time you open it, if macOS says it can&apos;t verify the developer, go to <strong>System Settings → Privacy &amp; Security → Open Anyway</strong>.
      </>,
    );
  }
  if (path.endsWith(".html")) {
    return tip("info", <>Runs in your browser: open the downloaded file in Chrome, Edge or Safari. It works offline, and your data stays on this computer.</>);
  }
  return null;
}

/**
 * Two-step download dialog: choose a device, then confirm with "Download Now".
 * Nothing is downloaded or opened until the final button is pressed.
 */
export function DownloadModal({ software, onClose }: { software: Software | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<Step>("device");
  const [device, setDevice] = useState<Device | null>(null);
  const [os, setOs] = useState<DesktopOs | null>(null);
  const [started, setStarted] = useState(false);
  const [detected, setDetected] = useState<Detected | null>(null);
  const [closing, setClosing] = useState(false);

  // Open/reset whenever a new app is chosen.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !software) return;
    setStep("device");
    setDevice(null);
    setOs(null);
    setStarted(false);
    setClosing(false);
    setDetected(detectDevice());
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [software]);

  // Move focus to the step heading when the step changes (screen readers announce it).
  useEffect(() => {
    if (software) headingRef.current?.focus();
  }, [step, software]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClosing(true);
    window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, reduce ? 0 : 160);
  }, []);

  const chooseDevice = (d: Device) => {
    if (!software || !isDeviceAvailable(software, d)) return;
    setDevice(d);
    setStarted(false);
    if (d === "desktop") {
      const list = availableOs(software);
      setOs(detected?.os && list.includes(detected.os) ? detected.os : list[0]);
    } else {
      setOs(null);
    }
    setStep("confirm");
  };

  const sw = software;
  const url = sw && device ? downloadUrl(sw, device, os ?? undefined) : null;
  const external = url ? isExternalUrl(url) : false;
  // Store/web pages open in a new tab; installer files download in place.
  const newTab = !!url && external && !isDirectFile(url);
  const size = sw && device ? platformSize(sw, device, os) : undefined;
  const selected = DEVICES.find((d) => d.id === device);
  const released = formatDate(sw?.releaseDate);
  const osList = sw ? availableOs(sw) : [];

  return (
    <dialog
      ref={dialogRef}
      className={`modal${closing ? " is-closing" : ""}`}
      aria-labelledby="dl-title"
      onCancel={(e) => {
        e.preventDefault(); // animate Esc-close too
        close();
      }}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // click on backdrop
      }}
    >
      {sw && (
        <div className="modal__panel">
          <header className="modal__head">
            <SoftwareLogo software={sw} size={44} />
            <div className="modal__title">
              <p className="modal__eyebrow">Download</p>
              <h2 id="dl-title">{sw.name}</h2>
              <p className="subtle">
                Version {sw.version}
              </p>
            </div>
            <button type="button" className="icon-btn modal__close" onClick={close} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
          </header>

          <ol className="modal__progress" aria-label="Progress">
            <li className={step === "device" ? "is-current" : "is-done"} aria-current={step === "device" ? "step" : undefined}>
              1. Choose device
            </li>
            <li className={step === "confirm" ? "is-current" : undefined} aria-current={step === "confirm" ? "step" : undefined}>
              2. Download
            </li>
          </ol>

          {step === "device" ? (
            <div className="modal__body" key="device">
              <h3 ref={headingRef} tabIndex={-1} className="modal__question">
                Where do you want to download this software?
              </h3>
              <div className="device-grid" role="group" aria-label="Choose a device">
                {DEVICES.map((d) => {
                  const available = isDeviceAvailable(sw, d.id);
                  const isSelected = device === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      className="device-card"
                      aria-pressed={isSelected}
                      disabled={!available}
                      onClick={() => chooseDevice(d.id)}
                    >
                      {detected?.device === d.id && available && <span className="device-card__here">This device</span>}
                      <span className="device-card__icon">
                        <Icon name={d.icon} size={26} />
                      </span>
                      <span className="device-card__label">{d.label}</span>
                      <span className="device-card__hint">
                        {!available
                          ? "Not available"
                          : d.id === "desktop"
                            ? DESKTOP_OS.filter((o) => osList.includes(o.id)).map((o) => o.label).join(" & ")
                            : d.hint}
                      </span>
                      {isSelected && (
                        <span className="device-card__check" aria-hidden="true">
                          <Icon name="check" size={14} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="modal__body" key="confirm">
              <h3 ref={headingRef} tabIndex={-1} className="sr-only">
                Download for {selected?.label}
              </h3>
              <div className="selected-device">
                <span className="device-card__icon">{selected && <Icon name={selected.icon} size={22} />}</span>
                <div>
                  <span className="subtle">Selected device</span>
                  <strong>{selected?.label}</strong>
                </div>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStep("device")}>
                  Change
                </button>
              </div>

              {device === "desktop" && osList.length > 0 && (
                <div className="os-choice">
                  <span className="field-hint">Operating system</span>
                  <div className="billing-toggle" role="group" aria-label="Operating system">
                    {DESKTOP_OS.filter((o) => osList.includes(o.id)).map((o) => (
                      <button key={o.id} type="button" aria-pressed={os === o.id} onClick={() => { setOs(o.id); setStarted(false); }}>
                        <Icon name={o.icon} size={15} style={{ display: "inline", verticalAlign: -3, marginRight: 6 }} />
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <dl className="dl-meta">
                <div>
                  <dt>Version</dt>
                  <dd>{sw.version}</dd>
                </div>
                {size && (
                  <div>
                    <dt>File size</dt>
                    <dd>{size}</dd>
                  </div>
                )}
                {released && (
                  <div>
                    <dt>Released</dt>
                    <dd>{released}</dd>
                  </div>
                )}
                {sw.license && (
                  <div className="dl-meta__wide">
                    <dt>License</dt>
                    <dd>{sw.license}</dd>
                  </div>
                )}
              </dl>

              <InstallTip url={url} isAppleMobile={!!detected?.appleMobile} />

              {url ? (
                <a
                  className="btn btn--primary btn--lg btn--block"
                  href={withBasePath(url)}
                  {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : external ? {} : { download: "" })}
                  onClick={() => {
                    setStarted(true);
                    track("download", { label: sw.id, device: device ?? undefined, os: os ?? undefined });
                  }}
                >
                  <Icon name="download" size={18} />
                  Download Now
                </a>
              ) : (
                <p className="alert alert--info">This download isn&apos;t available for the selected device.</p>
              )}

              <p className="modal__note" aria-live="polite">
                {started ? (
                  <>
                    <Icon name="checkCircle" size={16} /> Your download should start shortly{newTab ? " in a new tab" : ""}.
                  </>
                ) : newTab && url ? (
                  <>Opens {new URL(url).hostname} in a new tab.</>
                ) : null}
              </p>

              <div className="modal__foot">
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStep("device")}>
                  <Icon name="arrowLeft" size={16} /> Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
