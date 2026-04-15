export type QRCodeCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export declare class WdprQrcode {
    private _qrCodeContainer;
    el: HTMLElement;
    _isLoaded: boolean;
    /**
     * The text or URL to encode in the QR code.
     */
    text: string;
    /**
     * The size (width and height) of the QR code in pixels.
     */
    size: number;
    /**
     * Accessible label for the QR code. Defaults to "QR code for: [text]"; can be
     * overridden for long URLs or sensitive data.
     */
    a11yLabel?: string;
    /**
     * Error correction level for the QR code.
     * L = Low (7%), M = Medium (15%), Q = Quartile (25%), H = High (30%)
     */
    correctionLevel: QRCodeCorrectionLevel;
    handlePropsChange(): void;
    componentDidLoad(): void;
    private _generateQRCode;
    render(): any;
}
