import CONST from '../../data/const';
const Rectangle = Phaser.Geom.Rectangle;

export class VisualLoader {
  private scene: Phaser.Scene;
  private progressBar?: Phaser.GameObjects.Graphics;
  private progressBgRect?: Phaser.Geom.Rectangle;
  private progressRect?: Phaser.Geom.Rectangle;

  constructor(scene: any) {
    this.scene = scene;
  }

  /**
   * createProgressBar
   */
  public createProgressBar() {
    const main = this.scene.cameras.main;

    this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);

    Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.5 * main.height);

    this.progressRect = Rectangle.Clone(this.progressBgRect);
    this.progressBar = this.scene.add.graphics();
  }

  /**
   * onLoadComplete
   */
  public onLoadComplete(loader: any, totalComplete: number, totalFailed: number) {
    // console.debug('complete', totalComplete);
    // console.debug('failed', totalFailed);
    if (!this.progressBar) { return; }
    this.progressBar.destroy();
  }

  /**
   * onLoadProgress
   */
  public onLoadProgress(progress: number) {
    // console.debug('progress', progress);
    if (!this.progressBar || !this.progressBgRect || !this.progressRect) { return; }

    this.progressRect.width = progress * this.progressBgRect.width;

    this.progressBar
      .clear()
      .fillStyle(CONST.hexColors.darkGray)
      .fillRectShape(this.progressBgRect)
      .fillStyle(this.scene.load.totalFailed ? CONST.hexColors.red : CONST.hexColors.white)
      .fillRectShape(this.progressRect);
  }
}
