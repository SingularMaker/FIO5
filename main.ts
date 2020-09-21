/*
 fio5 package
*/

//% weight=10 color=#3CB371 icon="\uf1b9" blockId="fio5" block="fio5"
namespace fio5 {
	export enum MotorLocation {
		M1 = 0x01,
		M2 = 0x02,
		M3 = 0x03,
		M4 = 0x04
	}

	export enum MotorDir {
		CW = 0x01,
		CCW = 0x02
	}

	export enum LampPosition {
		O1 = 0x01,
		O2 = 0x02,
		O3 = 0x03,
		O4 = 0x04,
		O5 = 0x05,
		O6 = 0x06,
		O7 = 0x07,
		O8 = 0x08	
	}

	export enum InputPosition {
		I1 = 0x01,
		I2 = 0x02,
		I3 = 0x03,
		I4 = 0x04,
		I5 = 0x05,
		I6 = 0x06	
	}	

	export enum Switch {
		OFF = 0x00,
		ON = 0x01
	}

	export enum ButtonStatus {
		Release = 0x00,
		Press = 0x01
	}

	export enum Sensor {
		PushButton = 0x00,
		Phototransistor = 0x01,
		ReedSwitch = 0x02,
		Trail = 0x03
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
    export function SetMotor(pos: MotorLocation, dir: MotorDir, speed: number):void {
		let ctrl_0 = 0;
		let ctrl_1 = 0;
					
		if(MotorDir.CW == dir) {
			ctrl_0 = speed;
			ctrl_1 = 0;
		} else {
			ctrl_0 = 0;
			ctrl_1 = speed;			
		}
			
		if (MotorLocation.M1 == pos) {
				pins.analogWritePin(AnalogPin.P16, ctrl_0);
				pins.analogWritePin(AnalogPin.P15, ctrl_1);
		}
		if (MotorLocation.M2 == pos) {
				pins.analogWritePin(AnalogPin.P14, ctrl_0);
				pins.analogWritePin(AnalogPin.P13, ctrl_1);			
		}
			
		if (MotorLocation.M3 == pos) {
				pins.analogWritePin(AnalogPin.P12, ctrl_0);
				pins.analogWritePin(AnalogPin.P10, ctrl_1);			
		}
			
		if (MotorLocation.M4 == pos ) {
				pins.analogWritePin(AnalogPin.P9, ctrl_0);
				pins.analogWritePin(AnalogPin.P8, ctrl_1);		
		} 
	}

    /** 
	* Set Lamp
	*/
    //% weight=120 blockId="SetLamp" block="SetLamp|position %pos|switch %status"	
    export function SetLamp(pos: LampPosition, status: Switch):void {
		
		switch(pos) {
			case LampPosition.O1:
				pins.digitalWritePin(DigitalPin.P16, status)
				break;
			case LampPosition.O2:
				pins.digitalWritePin(DigitalPin.P15, status)
				break;				
			case LampPosition.O3:
				pins.digitalWritePin(DigitalPin.P14, status)
				break;
			case LampPosition.O4:
				pins.digitalWritePin(DigitalPin.P13, status)
				break;
			case LampPosition.O5:
				pins.digitalWritePin(DigitalPin.P12, status)
				break;
			case LampPosition.O6:
				pins.digitalWritePin(DigitalPin.P10, status)
				break;				
			case LampPosition.O7:
				pins.digitalWritePin(DigitalPin.P9, status)
				break;
			case LampPosition.O8:
				pins.digitalWritePin(DigitalPin.P8, status)
				break;
			default:
				break;			
		}
	}
	
    /** 
	* Until Button Press or Rlease
	*/	
    //% weight=120 blockId="UntilButtonPress" block="Until|Button %button|Is %status"	
    export function UntilButtonPress(button: Button, status: ButtonStatus):void {		
        while(true) {
            let value = input.buttonIsPressed(button)? 1: 0;     
		    if ( status == value ) {
			    break;
		    }
        }    
	}
	
    /** 
	* Until Sensor trigger or release
	*/	
	//% weight=120 blockId="UntilMatchSensor" block="Wait for|Input %pos|Sensor %Sensor|to %status"	
	//% status.min=0 status.max=1
    export function WaitForSensor(pos: InputPosition, sensor: Sensor, status: SensorStatus):void {	
		let pin_name = DigitalPin.P1;

        switch(pos) {
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
        let conditon = 1;

        while (conditon) {
            let new_val = pins.digitalReadPin(pin_name);
            switch(status) {
                case SensorStatus.Zero:
                    if(new_val == 0)
                        conditon = 0;
                    break;
                case SensorStatus.One:
                    if(new_val == 1)
                        conditon = 0;
                    break;				
                case SensorStatus.Rising:
                    if(old_val == 0 && new_val == 1)
						conditon = 0;
					else 
						old_val = new_val;
                    break;
                case SensorStatus.Falling:
                    if(old_val == 1 && new_val == 0)
						conditon = 0;
					else
						old_val = new_val
                    break;
                case SensorStatus.Both:
                    if(old_val != new_val)
                        conditon = 0;
                    break;				
                default:
                    break	       
            }
        }  
    }		
}
