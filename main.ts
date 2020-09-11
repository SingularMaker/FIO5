//% weight=0 color=#3CB371 icon="\uf1b9"
namespace fio5 {
	enum MotorLocation {
		M1 = 0,//% p15,p16
		M2 = 1,//% p14,p13
		M3 = 2,//% p12,p11
		M4 = 3//% p10,p09
	}	

	enum MotorDir {
		CW = 0,//% p15,p16
		CCW = 1//% p14,p13
	}	
	
	/**
    * singularbot board initialization, please execute at boot time
	*/
	//% weight=100 blockId=singularbotInit block="Initialize singularbot"
	export function singularbotInit() {
	}	
}
