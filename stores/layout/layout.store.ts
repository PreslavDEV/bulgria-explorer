import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { IBottomSheetOption } from "@/components/ui/color-bottom-sheet/color-bottom-sheet";

@injectable()
export class LayoutStore {
  public sheetRef: Maybe<BottomSheetMethods>;

  public colorOptions: IBottomSheetOption[];

  constructor() {
    this.sheetRef = null;

    this.colorOptions = [];

    makeObservable(this, {
      sheetRef: observable,
      colorOptions: observable,

      setSheetRef: action.bound,
      setColorOptions: action.bound,
    });
  }

  public setSheetRef(ref: BottomSheetMethods) {
    this.sheetRef = ref;
  }

  public setColorOptions(options: IBottomSheetOption[]) {
    this.colorOptions = options;
  }
}
