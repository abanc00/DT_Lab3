function decode(bits) {
	var errorPosition = 0;
	var z4 = 0, z3 = 0, z2 = 0, z1 = 0, z0 = 0;
	var bits = bits.bits;
	var no_of_bits = bits.numberOfDataBits;
	var parity_bit = bits.par;
	var errorDetected = false;
	var errorCorrected = false;

	if (no_of_bits == 4) {
		if (parity_bit == 0) {
			z3 = parity(bits[3] + bits[4] + bits[5] + bits[6]);
			z2 = parity(bits[1] + bits[2] + bits[5] + bits[6]);
			z1 = parity(bits[0] + bits[2] + bits[4] + bits[6]);
			errorPosition = z1 * 1 + z2 * 2 + z3 * 4;

			if (errorPosition != 0){
				errorDetected = true;
			}
			if (errorDetected) {
				errorCorrected = true;
				bits[errorPosition - 1] = parity(bits[errorPosition - 1] + 1);
			}
		} else {
			z3 = parity(bits[4] + bits[5] + bits[6] + bits[7]);
			z2 = parity(bits[2] + bits[3] + bits[6] + bits[7]);
			z1 = parity(bits[1] + bits[3] + bits[5] + bits[7]);
			z0 = parity(bits[0] + bits[1] + bits[2] + bits[3] + bits[4] + bits[5] + bits[6] + bits[7]);
			errorPosition = z1 * 1 + z2 * 2 + z3 * 4;
			
			if (errorPosition != 0) {
				errorDetected=true;	
			}
			if (errorDetected) {
				errorCorrected = true;
				bits[errorPosition] = parity(bits[errorPosition] + 1);
			}
		}
	} else if (no_of_bits == 8) {
		if (parity_bit == 0) {
			z3 = parity(bits[7] + bits[8] + bits[9] + bits[10]);
			z2 = parity(bits[3] + bits[4] + bits[5] + bits[6] + bits[11]);
			z1 = parity(bits[1] + bits[2] + bits[5] + bits[6] + bits[9] + bits[10]);
			z0 = parity(bits[0] + bits[2] + bits[4] + bits[6] + bits[8] + bits[10]);
			errorPosition = z0 * 1 + z1 * 2 + z2 * 4 + z3 * 8;
			
			if (errorPosition!=0) errorDetected=true;
			if (errorDetected) {
				errorCorrected=true;
				bits[errorPosition-1]=parity(bits[errorPosition-1]+1);
			}
		} else {
			z4 = parity(bits[8] + bits[9] + bits[10] + bits[11]);
			z3 = parity(bits[4] + bits[5] + bits[6] + bits[7] + bits[12]);
			z2 = parity(bits[2] + bits[3] + bits[6] + bits[7] + bits[10] + bits[11]);
			z1 = parity(bits[1] + bits[3] + bits[5] + bits[7] + bits[9] + bits[11]);
			z0 = parity(bits[0] + bits[1] + bits[2] + bits[3] + bits[4] + bits[5] + bits[6] + bits[7] + bits[8] + bits[9] + bits[10] + bits[11]);
			errorPosition=z1 * 1 + z2 * 2 + z3 * 4 + z4 * 8;
			
			if (errorPosition != 0) {
				errorDetected=true;
			}
			if (errorDetected) {
				errorCorrected = true;
				bits[errorPosition] = parity(bits[errorPosition] + 1);
			}
		}
	}
	return { errorCorrected: errorCorrected, errorDetected: errorDetected, errorPosition: errorPosition - 1, bits: bits };
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;
