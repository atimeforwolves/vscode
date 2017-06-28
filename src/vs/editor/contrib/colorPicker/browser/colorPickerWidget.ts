/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IOverlayWidget, IOverlayWidgetPosition, ICodeEditor } from "vs/editor/browser/editorBrowser";
import { Widget } from "vs/base/browser/ui/widget";
import { ColorPickerController } from "vs/editor/contrib/colorPicker/browser/colorPicker";
import * as dom from 'vs/base/browser/dom';
import { ColorPickerHeader } from "vs/editor/contrib/colorPicker/browser/elements/colorPickerHeader";
import { ColorPickerBody } from "vs/editor/contrib/colorPicker/browser/elements/colorPickerBody";
const $ = dom.$;

export class ColorPickerWidget extends Widget implements IOverlayWidget {
	private static ID = 'editor.contrib.colorPickerWidget';
	private readonly width = 400;
	private readonly height = 350;

	private domNode: HTMLElement;
	private header: ColorPickerHeader;
	private body: ColorPickerBody;

	private visible: boolean = false;
	public originalColor: string;
	public selectedColor: string;

	constructor(controller: ColorPickerController, public editor: ICodeEditor) {
		super();

		this.domNode = $('editor-widget colorpicker-widget');
		this.domNode.setAttribute('aria-hidden', 'false');
		editor.addOverlayWidget(this);
	}

	public show(color: string): void {
		if (this.visible) {
			return;
		}

		this.originalColor = color;
		this.selectedColor = color;

		this.header = new ColorPickerHeader(this);
		this.body = new ColorPickerBody(this, this.width - 100);

		this.layout();
		this.visible = true;
	}

	private layout(): void {
		let editorLayout = this.editor.getLayoutInfo();

		let top = Math.round((editorLayout.height - this.height) / 2);
		this.domNode.style.top = top + 'px';

		let left = Math.round((editorLayout.width - this.width) / 2);
		this.domNode.style.left = left + 'px';

		this.domNode.style.backgroundColor = 'red';
		this.domNode.style.width = this.width + 'px';
		this.domNode.style.height = this.height + 'px';
	}

	public changePrimaryColor(): void {

	}
	public changeShade(): void {

	}
	public changeOpacity(): void {

	}

	public changeSelectedColor(color: string): void {
		this.selectedColor = color;
		this.layout();
	}

	public dispose(): void {
		this.editor.removeOverlayWidget(this);
		super.dispose();
	}

	public getId(): string {
		return ColorPickerWidget.ID;
	}

	public getDomNode(): HTMLElement {
		return this.domNode;
	}

	public getPosition(): IOverlayWidgetPosition {
		return {
			preference: null
		};
	}
}