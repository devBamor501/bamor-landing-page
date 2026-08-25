interface PathPoint {
  x: number;
  y: number;
}

interface PathMetrics {
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
}

class BamorRouteAnimator {
  private container: HTMLElement | null;
  private van: HTMLElement | null;
  private pathElement: SVGPathElement | null;
  private steps: HTMLElement[];
  private mediaQuery: MediaQueryList;
  private pathLength = 0;
  private ticking = false;

  constructor() {
    this.container = document.getElementById("path-container");
    this.van = document.getElementById("bamor-van");
    this.pathElement = document.querySelector<SVGPathElement>("#route-path");
    this.steps = Array.from(document.querySelectorAll<HTMLElement>(".step-item"));
    this.mediaQuery = window.matchMedia("(min-width: 1024px)");

    if (!this.container || !this.van || !this.pathElement || !this.steps.length) return;

    this.init();
  }

  private init(): void {
    this.layout();
    this.update();

    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize);
    this.mediaQuery.addEventListener("change", this.onResize);
  }

  private onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  };

  private onResize = (): void => {
    this.layout();
    this.update();
  };

  private layout(): void {
    if (!this.pathElement || !this.container) return;

    if (!this.mediaQuery.matches) {
      this.steps.forEach((step) => {
        step.style.removeProperty("left");
        step.style.removeProperty("top");
      });
      return;
    }

    this.pathLength = this.pathElement.getTotalLength();
    const metrics = this.getMetrics();
    if (!metrics) return;

    this.steps.forEach((step) => {
      const fraction = parseFloat(step.dataset.fraction ?? "0");
      const point = this.pointAt(fraction, metrics);
      const icon = step.querySelector<HTMLElement>(".step-icon");
      const iconRadius = icon ? icon.offsetWidth / 2 : 32;

      step.style.left = `${point.x}px`;
      step.style.top = `${point.y - iconRadius}px`;
    });
  }

  private getMetrics(): PathMetrics | null {
    if (!this.pathElement || !this.container) return null;
    const svg = this.pathElement.ownerSVGElement;
    if (!svg) return null;

    const svgRect = svg.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;

    return {
      scaleX: svgRect.width / viewBox.width,
      scaleY: svgRect.height / viewBox.height,
      offsetX: svgRect.left - containerRect.left,
      offsetY: svgRect.top - containerRect.top,
    };
  }

  private pointAt(fraction: number, metrics: PathMetrics): PathPoint {
    if (!this.pathElement) return { x: 0, y: 0 };
    const raw = this.pathElement.getPointAtLength(this.pathLength * fraction);
    return { x: raw.x * metrics.scaleX + metrics.offsetX, y: raw.y * metrics.scaleY + metrics.offsetY };
  }

  private update(): void {
    if (!this.container || !this.van) return;

    if (!this.mediaQuery.matches) {
      this.van.classList.add("hidden");
      this.steps.forEach((step) => this.reveal(step, true));
      return;
    }

    const progress = this.scrollProgress();
    const metrics = this.getMetrics();
    if (!metrics) return;

    const vanPoint = this.pointAt(progress, metrics);
    this.van.classList.remove("hidden");
    this.van.style.left = `${vanPoint.x}px`;
    this.van.style.top = `${vanPoint.y}px`;

    this.steps.forEach((step) => {
      const fraction = parseFloat(step.dataset.fraction ?? "0");
      this.reveal(step, progress >= fraction - 0.015);
    });
  }

  private reveal(step: HTMLElement, isRevealed: boolean): void {
    const card = step.querySelector<HTMLElement>(".step-card");
    const line = step.querySelector<HTMLElement>(".step-line");
    const text = step.querySelector<HTMLElement>(".step-text");
    if (!card) return;

    if (isRevealed) {
      step.classList.add("active");
      card.classList.remove("bg-transparent", "border-transparent");
      card.classList.add("bg-white", "border-[#F3E8DB]", "shadow-[0_15px_35px_rgba(0,0,0,0.07)]");
      line?.classList.remove("opacity-0");
      line?.classList.add("opacity-100");
      text?.classList.remove("opacity-0");
      text?.classList.add("opacity-100");
    } else {
      step.classList.remove("active");
      card.classList.add("bg-transparent", "border-transparent");
      card.classList.remove("bg-white", "border-[#F3E8DB]", "shadow-[0_15px_35px_rgba(0,0,0,0.07)]");
      line?.classList.add("opacity-0");
      line?.classList.remove("opacity-100");
      text?.classList.add("opacity-0");
      text?.classList.remove("opacity-100");
    }
  }

  private scrollProgress(): number {
    if (!this.container) return 0;
    const rect = this.container.getBoundingClientRect();
    const anchor = window.innerHeight * 0.65;
    const progress = (anchor - rect.top) / rect.height;
    return Math.min(1, Math.max(0, progress));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BamorRouteAnimator();
});
