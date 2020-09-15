import { NgModule } from "@angular/core";
import { BarsIconComponent } from "./bars-icon.component";
import { ExternalLinkIconComponent } from "./external-link-icon.component";
import { SearchIconComponent } from "./search-icon.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [BarsIconComponent, ExternalLinkIconComponent, SearchIconComponent],
    imports: [CommonModule],
    exports: [BarsIconComponent, ExternalLinkIconComponent, SearchIconComponent],
})
export class IconsModule {}
