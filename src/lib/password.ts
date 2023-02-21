export const getPasswordEntropy = (password: string): number => {
    const alphabetLength = 100;
    
    // Create a frequency map of the characters in the password
    let frequencyMap: { [key: string]: number } = {};
    for (let char of password) {
      if (!frequencyMap[char]) {
        frequencyMap[char] = 0;
      }
      frequencyMap[char]++;
    }

    // Calculate the entropy of the password
    let entropy = 0;
    let passwordLength = password.length;
    for (let char in frequencyMap) {
      let probability = frequencyMap[char] / passwordLength;
      entropy -= probability Math.log2(probability);
    }
    entropy += Math.log2(Math.pow(alphabetLength,passwordLength));

    return entropy
}

export const validatePassword = (password: string): {result: boolean, entropy: number} => {
    const minEntropy = 80  // minimum entropy in bits
    const entropy = getPasswordEntropy(password)  // compute the entropy of the password

    if (entropy >= minEntropy) {
        return {result: true, entropy}
    } else {
        return {result: false, entropy}
    }
}

export class PasswordNotStrongEnough extends Error {
    constructor(message: string) {
        super(message)
        this.name = "PasswordNotStrongEnough"
    }
}

export class PasswordDoesNotMatch extends Error {
    constructor(message: string) {
        super(message)
        this.name = "PasswordDoesNotMatch"
    }
}
