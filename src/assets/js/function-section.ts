export interface StepPoint {
  x: number;
  y: number;
}

export class BamorVanTracker {
  private vanElement: HTMLElement | null;
  private pathElement: SVGPathElement | null;
  private stepItems: NodeListOf<HTMLElement>;
  private stepPositions: StepPoint[] = [];

  constructor() {
    this.vanElement = document.getElementById("bamor-van");
    this.pathElement = document.querySelector<SVGPathElement>("#route-path");
    this.stepItems = document.querySelectorAll<HTMLElement>(".step-item");

    this.init();
  }

  private init(): void {
    if (!this.vanElement || !this.stepItems.length) return;

    this.calculatePathCoordinates();
    this.attachEventListeners();
    
    // Iniciar con el Paso 4 destacado por defecto
    this.moveToStep(3);
  }

  private calculatePathCoordinates(): void {
    if (!this.pathElement) {
      this.stepPositions = [
        { x: 60, y: 120 },
        { x: 300, y: 50 },
        { x: 560, y: 170 },
        { x: 820, y: 90 },
        { x: 1020, y: 140 }
      ];
      return;
    }

    const totalLength = this.pathElement.getTotalLength();
    const fractions = [0.0, 0.24, 0.52, 0.78, 1.0];

    this.stepPositions = fractions.map((fraction) => {
      const point = this.pathElement!.getPointAtLength(totalLength * fraction);
      return { x: point.x, y: point.y };
    });
  }

  public moveToStep(stepIndex: number): void {
    if (!this.vanElement || stepIndex < 0 || stepIndex >= this.stepPositions.length) return;

    const targetCoord = this.stepPositions[stepIndex];

    this.vanElement.style.left = `${targetCoord.x}px`;
    this.vanElement.style.top = `${targetCoord.y}px`;

    this.stepItems.forEach((item, index) => {
      const card = item.querySelector<HTMLElement>(".step-card");
      const line = item.querySelector<HTMLElement>(".step-line");

      if (!card) return;

      if (index === stepIndex) {
        item.classList.add("active");
        
        card.classList.remove("bg-transparent", "border-transparent");
        card.classList.add(
          "bg-[#FAF4EE]",
          "border-[#F3E8DB]",
          "shadow-[0_15px_35px_rgba(0,0,0,0.07)]"
        );

        if (line) {
          line.classList.remove("opacity-0");
          line.classList.add("opacity-100");
        }
      } else {
        item.classList.remove("active");
        
        card.classList.remove(
          "bg-[#FAF4EE]",
          "border-[#F3E8DB]",
          "shadow-[0_15px_35px_rgba(0,0,0,0.07)]"
        );
        card.classList.add("bg-transparent", "border-transparent");

        if (line) {
          line.classList.remove("opacity-100");
          line.classList.add("opacity-0");
        }
      }
    });
  }

  private attachEventListeners(): void {
    this.stepItems.forEach((item, index) => {
      item.addEventListener("click", () => this.moveToStep(index));
      item.addEventListener("mouseenter", () => this.moveToStep(index));
    });

    window.addEventListener("resize", () => this.calculatePathCoordinates());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BamorVanTracker();
});