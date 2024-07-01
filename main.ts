/*
fio5 package
*/

//% weight=10 color=#3CB371 icon="\uf1b9" blockId="fio5" block="fio5"
namespace fio5 {
    export enum MotorLocation {
        M1 = 0x01,
        M2 = 0x02,
        M3 = 0x03,
        M4 = 0x04,
    }

    export enum MotorDir {
        CW = 0x01,
        CCW = 0x02,
    }

    export enum LampPosition {
        M1 = 0x01,
        M2 = 0x02,
        M3 = 0x03,
        M4 = 0x04,
        O1 = 0x05,
        O2 = 0x06,
        O3 = 0x07,
        O4 = 0x08,
        O5 = 0x09,
        O6 = 0x0a,
        O7 = 0x0b,
        O8 = 0x0c,
    }

    export enum InputPosition {
        I1 = 0x01,
        I2 = 0x02,
        I3 = 0x03,
        I4 = 0x04,
        I5 = 0x05,
        I6 = 0x06,
    }

    export enum Switch {
        OFF = 0x00,
        ON = 0x01,
    }

    export enum ButtonStatus {
        Release = 0x00,
        Press = 0x01,
    }

    export enum Sensor {
        PushButton = 0x00,
        Phototransistor = 0x01,
        ReedSwitch = 0x02,
        Trail = 0x03,
    }

    export enum SensorStatus {
        Zero = 0x00,
        One = 0x01,
        Rising = 0x02,
        Falling = 0x03,
        Both = 0x04,
    }
    /**
     * Set Motor
     */
    //% weight=120 blockId="SetMotor" block="SetMotor|position %pos|direction %dir|speed %speed"
    //% speed.min=0 speed.max=1023
    export function SetMotor(
        pos: MotorLocation,
        dir: MotorDir,
        speed: number
    ): void {
        let ctrl_0 = 0;
        let ctrl_1 = 0;

        if (MotorDir.CW == dir) {
            ctrl_0 = speed;
            ctrl_1 = 0;
        } else {
            ctrl_0 = 0;
            ctrl_1 = speed;
        }

        switch (pos) {
            case MotorLocation.M1:
                pins.analogWritePin(AnalogPin.P16, ctrl_0);
                pins.analogWritePin(AnalogPin.P15, ctrl_1);
                break;
            case MotorLocation.M2:
                pins.analogWritePin(AnalogPin.P14, ctrl_0);
                pins.analogWritePin(AnalogPin.P13, ctrl_1);
                break;
            case MotorLocation.M3:
                pins.analogWritePin(AnalogPin.P12, ctrl_0);
                pins.analogWritePin(AnalogPin.P10, ctrl_1);
                break;
            case MotorLocation.M4:
                pins.analogWritePin(AnalogPin.P9, ctrl_0);
                pins.analogWritePin(AnalogPin.P8, ctrl_1);
                break;
        }
    }

    /**
     * Set Lamp
     */
    //% weight=120 blockId="SetLamp" block="SetLamp|position %pos|switch %status"
    export function SetLamp(pos: LampPosition, status: Switch): void {
        switch (pos) {
            case LampPosition.M1:
                pins.analogWritePin(DigitalPin.P16, status);
                pins.analogWritePin(DigitalPin.P15, 0);
                break;
            case LampPosition.M2:
                pins.analogWritePin(DigitalPin.P14, status);
                pins.analogWritePin(DigitalPin.P13, 0);
                break;
            case LampPosition.M3:
                pins.analogWritePin(DigitalPin.P12, status);
                pins.analogWritePin(DigitalPin.P10, 0);
                break;
            case LampPosition.M4:
                pins.analogWritePin(DigitalPin.P9, status);
                pins.analogWritePin(DigitalPin.P8, 0);
                break;
            case LampPosition.O1:
                pins.digitalWritePin(DigitalPin.P16, status);
                break;
            case LampPosition.O2:
                pins.digitalWritePin(DigitalPin.P15, status);
                break;
            case LampPosition.O3:
                pins.digitalWritePin(DigitalPin.P14, status);
                break;
            case LampPosition.O4:
                pins.digitalWritePin(DigitalPin.P13, status);
                break;
            case LampPosition.O5:
                pins.digitalWritePin(DigitalPin.P12, status);
                break;
            case LampPosition.O6:
                pins.digitalWritePin(DigitalPin.P10, status);
                break;
            case LampPosition.O7:
                pins.digitalWritePin(DigitalPin.P9, status);
                break;
            case LampPosition.O8:
                pins.digitalWritePin(DigitalPin.P8, status);
                break;
            default:
                break;
        }
    }

    /**
     * Set Lamp State with 0 or 1
     */
    //% weight=120 blockId="SetLampState" block="SetLampState|position %pos|state %state"
    export function SetLampState(pos: LampPosition, state: number): void {
        let status: Switch = state == 1 ? Switch.ON : Switch.OFF;
        SetLamp(pos, status);
    }

    /**
     * Until Button Press or Release
     */
    //% weight=120 blockId="UntilButtonPress" block="UntilButtonPress|Button %button|Is %status"
    export function UntilButtonPress(
        button: Button, // button A or B
        status: ButtonStatus
    ): void {
        while (true) {
            let value = input.buttonIsPressed(button) ? 1 : 0;
            if (status == value) {
                break;
            }
        }
    }

    /**
     * Until Sensor trigger or release
     */
    //% weight=120 blockId="UntilMatchSensor" block="UntilMatchSensor|position %pos|sensor %Sensor|to %status"
    //% status.min=0 status.max=1
    export function UntilMatchSensor(
        pos: InputPosition,
        sensor: Sensor,
        status: SensorStatus
    ): void {
        let pin_name = DigitalPin.P1; // 將使用者輸入I1~I6轉換成擴展版上對應的pin

        switch (pos) {
            case InputPosition.I1:
                pin_name = DigitalPin.P1;
                break;
            case InputPosition.I2:
                pin_name = DigitalPin.P6;
                break;
            case InputPosition.I3:
                pin_name = DigitalPin.P4;
                break;
            case InputPosition.I4:
                pin_name = DigitalPin.P0;
                break;
            case InputPosition.I5:
                pin_name = DigitalPin.P3;
                break;
            case InputPosition.I6:
                pin_name = DigitalPin.P2;
                break;
            default:
                break;
        }
        let old_val = pins.digitalReadPin(pin_name);
        let condition = true;

        while (condition) {
            let new_val = pins.digitalReadPin(pin_name);

            switch (status) {
                case SensorStatus.Zero:
                    if (new_val == 0) condition = false;
                    break;
                case SensorStatus.One:
                    if (new_val == 1) condition = false;
                    break;
                case SensorStatus.Rising:
                    if (old_val == 0 && new_val == 1) {
                        condition = false;
                    } else {
                        old_val = new_val;
                        basic.pause(1);
                    }
                    break;
                case SensorStatus.Falling:
                    if (old_val == 1 && new_val == 0) {
                        condition = false;
                    } else {
                        old_val = new_val;
                        basic.pause(1);
                    }
                    break;
                case SensorStatus.Both:
                    if (old_val != new_val) {
                        condition = false;
                    } else {
                        old_val = new_val;
                        basic.pause(1);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Read Input State
     */
    //% weight=120 blockId="ReadInputState" block="ReadInputState|position %pos"
    export function ReadInputState(pos: InputPosition): number {
        let pin_name = DigitalPin.P1; // 將使用者輸入I1~I6轉換成擴展版上對應的pin

        switch (pos) {
            case InputPosition.I1:
                pin_name = DigitalPin.P1;
                break;
            case InputPosition.I2:
                pin_name = DigitalPin.P6;
                break;
            case InputPosition.I3:
                pin_name = DigitalPin.P4;
                break;
            case InputPosition.I4:
                pin_name = DigitalPin.P0;
                break;
            case InputPosition.I5:
                pin_name = DigitalPin.P3;
                break;
            case InputPosition.I6:
                pin_name = DigitalPin.P2;
                break;
            default:
                break;
        }
        return pins.digitalReadPin(pin_name);
    }
}
