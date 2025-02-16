import { toast } from "sonner";

export class HandleableError extends Error {
  constructor(
    message: string,
    private description?: string,
  ) {
    super(message);

    this.timer = setTimeout(() => {
      this.showErrorIfNotHandled();
    }, 300);
  }

  timer: NodeJS.Timeout;
  handled = false;

  handle() {
    this.handled = true;
    clearTimeout(this.timer);
  }

  showErrorIfNotHandled() {
    if (!this.handled) {
      this.handle();

      console.error(
        "This HandleableError had to show toast on it's own - this is a bad sign, " +
          "please find place where catched error is silently ignored and fix that",
        this,
      );

      this.showError();
    }
  }

  showError() {
    toast.error(this.description ? this.message : "Ошибка", {
      description: this.description ?? this.message,
    });
  }
}
