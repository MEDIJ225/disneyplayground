import { h } from "@stencil/core";
export class WdprMediaHero {
    variant = 'video';
    src;
    videoSrc;
    poster;
    alt = '';
    titleText = '';
    label;
    captionsSrc;
    showMediaButton = false;
    mediaButtonLabel = 'View';
    aspect = 'portrait';
    ratio = '3:4';
    view360Click;
    mediaButtonClick;
    fullscreen = false;
    el;
    componentDidUpdate() {
        if (this.fullscreen) {
            this.el.shadowRoot?.querySelector('[data-fullscreen]')?.focus();
        }
    }
    renderFullscreenShell(label, children) {
        return (h("div", { class: "fixed inset-0 z-50 flex flex-col bg-black", role: "dialog", "aria-modal": "true", "aria-label": label, tabindex: -1, "data-fullscreen": true, onKeyDown: (e) => e.key === 'Escape' && (this.fullscreen = false) }, h("wdpr-page-header", { "title-text": this.titleText, background: "transparent", inverse: true }, h("wdpr-icon-button", { slot: "leading-icon", iconName: "previous", a11yLabel: "Go back", variant: "inverse", onClicked: () => (this.fullscreen = false) })), children));
    }
    renderVideoFullscreen() {
        return this.renderFullscreenShell(this.titleText || 'Video', h("div", { class: "flex-1 overflow-hidden" }, h("wdpr-media-player", { src: this.videoSrc || this.src, poster: this.poster, "captions-src": this.captionsSrc, "captions-position": "top", "show-controls": true, "show-time": true, "show-mute-toggle": true, "show-fullscreen-button": false, "show-play-toggle-on-control": true, "show-progress-bar": true, "show-captions-toggle": !!this.captionsSrc, "show-audio-chip": false, class: "w-full h-full" })));
    }
    render360Fullscreen() {
        return this.renderFullscreenShell(this.titleText || '360° Photo', h("div", { class: "flex-1 flex items-center justify-center overflow-hidden" }, h("img", { src: this.src, alt: this.alt, class: "max-w-full max-h-full object-contain" })));
    }
    renderMedia(objectFit = 'cover') {
        return (h("wdpr-media", { src: this.src, alt: this.alt, aspect: this.aspect, "landscape-ratio": this.aspect === 'landscape' ? this.ratio : undefined, "portrait-ratio": this.aspect === 'portrait' ? this.ratio : undefined, "object-fit": objectFit, class: "w-full" }));
    }
    renderLabel() {
        if (!this.label)
            return null;
        return (h("div", { class: "absolute bottom-200 right-200 z-30" }, h("span", { class: labelClasses }, this.label)));
    }
    renderNavButtons() {
        return (h("div", { class: "absolute inset-x-0 top-0 z-30 flex items-center justify-between p-200" }, h("slot", { name: "leading-icon" }), h("slot", { name: "trailing-icon" })));
    }
    renderMediaButton() {
        if (!this.showMediaButton)
            return null;
        return (h("div", { class: "absolute bottom-200 left-200 z-30" }, h("button", { type: "button", class: mediaButtonClasses, "aria-label": `${this.mediaButtonLabel} media gallery`, onClick: () => this.mediaButtonClick.emit() }, this.mediaButtonLabel)));
    }
    renderScrim() {
        return h("div", { class: scrimClasses });
    }
    renderVideo() {
        return (h("div", { class: "relative w-full" }, h("wdpr-media-player", { src: this.videoSrc || this.src, poster: this.poster, "captions-src": this.captionsSrc, "show-controls": false, "show-audio-chip": false, class: "w-full" }), this.renderScrim(), this.renderNavButtons(), h("div", { class: "absolute inset-0 z-20 flex items-center justify-center" }, h("wdpr-media-player-control-play-toggle", { playing: false, variant: "overlay", onWdprPlayToggle: () => (this.fullscreen = 'video') })), this.renderLabel(), this.renderMediaButton()));
    }
    renderPhoto360() {
        return (h("div", { class: "relative w-full" }, this.renderMedia(), this.renderScrim(), this.renderNavButtons(), h("div", { class: "absolute inset-0 z-20 flex items-center justify-center" }, h("wdpr-media-hero-360-chip", { onView360Toggle: () => { this.fullscreen = '360'; this.view360Click.emit(); } })), this.renderLabel(), this.renderMediaButton()));
    }
    renderPhotograph() {
        return (h("div", { class: "relative w-full" }, this.renderMedia(), this.renderScrim(), this.renderNavButtons(), h("button", { type: "button", class: "absolute inset-0 z-15 cursor-pointer bg-transparent border-none p-0", "aria-label": "View photo fullscreen", onClick: () => (this.fullscreen = 'photo') }), this.renderLabel(), this.renderMediaButton()));
    }
    renderPhotographFullscreen() {
        return this.renderFullscreenShell(this.titleText || 'Photo fullscreen', h("div", { class: "flex-1 flex items-center justify-center overflow-hidden" }, h("img", { src: this.src, alt: this.alt, class: "max-w-full max-h-full object-contain" })));
    }
    render() {
        if (this.fullscreen === 'video')
            return this.renderVideoFullscreen();
        if (this.fullscreen === '360')
            return this.render360Fullscreen();
        if (this.fullscreen === 'photo')
            return this.renderPhotographFullscreen();
        switch (this.variant) {
            case 'video':
                return this.renderVideo();
            case 'photo-360':
                return this.renderPhoto360();
            case 'photograph':
                return this.renderPhotograph();
            default:
                return this.renderVideo();
        }
    }
    static get is() { return "wdpr-media-hero"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { display: block; width: 100%; }"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "MediaHeroVariant",
                    "resolved": "\"photo-360\" | \"photograph\" | \"video\"",
                    "references": {
                        "MediaHeroVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media-hero/wdpr-media-hero.tsx",
                            "id": "src/components/wdpr-media-hero/wdpr-media-hero.tsx::MediaHeroVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'video'"
            },
            "src": {
                "type": "string",
                "attribute": "src",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "videoSrc": {
                "type": "string",
                "attribute": "video-src",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "poster": {
                "type": "string",
                "attribute": "poster",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "alt": {
                "type": "string",
                "attribute": "alt",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "titleText": {
                "type": "string",
                "attribute": "title-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "captionsSrc": {
                "type": "string",
                "attribute": "captions-src",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showMediaButton": {
                "type": "boolean",
                "attribute": "show-media-button",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "mediaButtonLabel": {
                "type": "string",
                "attribute": "media-button-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'View'"
            },
            "aspect": {
                "type": "string",
                "attribute": "aspect",
                "mutable": false,
                "complexType": {
                    "original": "MediaAspect",
                    "resolved": "\"landscape\" | \"portrait\" | \"square\"",
                    "references": {
                        "MediaAspect": {
                            "location": "import",
                            "path": "../wdpr-media/wdpr-media",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::MediaAspect"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'portrait'"
            },
            "ratio": {
                "type": "string",
                "attribute": "ratio",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'3:4'"
            }
        };
    }
    static get states() {
        return {
            "fullscreen": {}
        };
    }
    static get events() {
        return [{
                "method": "view360Click",
                "name": "view360Click",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "mediaButtonClick",
                "name": "mediaButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
const scrimClasses = 'absolute inset-x-0 top-0 h-[30%] z-20 bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-transparent pointer-events-none';
const labelClasses = `
  inline-flex items-center rounded-full px-200 py-075
  bg-surface-actionable-alt-default-a68
  text-icon-actionable-inverse-default text-body-small font-semibold
  select-none
`;
const mediaButtonClasses = `
  cursor-pointer inline-flex items-center rounded-pill px-300 py-100
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
  elevation-xsmall-soft
  text-icon-actionable-inverse-default text-body-small font-semibold
  border border-white
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  transition-colors duration-150
`;
//# sourceMappingURL=wdpr-media-hero.js.map
