import { Money } from '@common/value';
import { ulid } from 'ulid';
import { PartyOption } from './option';
import { Policy } from './policy';

const DEFAULT_OPTION_NO = 0;
const DEFAULT_OPTION_NAME = '기본';
const DEFAULT_OPTION_PRICE = new Money(1000);
const DEFAULT_OPTION_POLICY = new Policy();
const DEFAULT_OPTION_MAX_COUNT = 10;

const generateOption = ({
  optionNo,
  name,
  price,
  policy,
  maxCount,
}: {
  optionNo?: number;
  name?: string;
  price?: Money;
  policy?: Policy;
  maxCount?: number;
}) => {
  return new PartyOption(
    ulid(),
    optionNo ?? DEFAULT_OPTION_NO,
    name ?? DEFAULT_OPTION_NAME,
    price ?? DEFAULT_OPTION_PRICE,
    policy ?? DEFAULT_OPTION_POLICY,
    maxCount ?? DEFAULT_OPTION_MAX_COUNT,
  );
};

describe('Option', () => {
  describe('Price Validation', () => {
    it('should throw error when price is cheeper than rule', () => {
      // given
      const price = new Money(500);

      // when
      const createOption = () => generateOption({ price });

      // then
      expect(createOption).toThrowError();
    });

    it('should throw error when price is illegal value', () => {
      // given
      const price = new Money(1550);

      // when
      const createOption = () => generateOption({ price });

      // then
      expect(createOption).toThrowError();
    });

    it('should create an instance when price is legal value', () => {
      // given
      const price = new Money(1500);
      // when
      const option = generateOption({ price });

      // then
      expect(option).toBeDefined();
    });
  });

  describe('MaxCount Validation', () => {
    it('should throw error when maxCount is lower than rule', () => {
      // given
      const maxCount = 5;

      // when
      const createOption = () => generateOption({ maxCount });

      // then
      expect(createOption).toThrowError();
    });

    it('should create an instance when maxCount is legal value', () => {
      // given
      const maxCount = 10;

      // when
      const option = generateOption({ maxCount });

      // then
      expect(option).toBeDefined();
    });
  });

  describe('Check State', () => {
    describe('isDefault', () => {
      it('should return true when option is default', () => {
        // given
        const optionNo = 0;
        const option = generateOption({ optionNo });

        // when
        const result = option.isDefault();

        // then
        expect(result).toBeTruthy();
      });

      it('should return false when option is not default', () => {
        // given
        const optionNo = 1;
        const option = generateOption({ optionNo });

        // when
        const result = option.isDefault();

        // then
        expect(result).toBeFalsy();
      });
    });

    describe('isAdditional', () => {
      it('should return true when option is additional', () => {
        // given
        const optionNo = 1;
        const option = generateOption({ optionNo });

        // when
        const result = option.isAdditional();

        // then
        expect(result).toBeTruthy();
      });

      it('should return false when option is not additional', () => {
        // given
        const optionNo = 0;
        const option = generateOption({ optionNo });

        // when
        const result = option.isAdditional();

        // then
        expect(result).toBeFalsy();
      });
    });

    describe('isSoldOut', () => {
      it('should return true when option is soldOut', () => {
        // given
        const option = generateOption({});

        option.sell(10);

        // when
        const result = option.isSoldOut();

        // then
        expect(result).toBeTruthy();
      });

      it('should return false when option is not soldOut', () => {
        // given
        const option = generateOption({});

        // when
        const result = option.isSoldOut();

        // then
        expect(result).toBeFalsy();
      });
    });
  });

  describe('Sell', () => {
    it('should throw error when sell count is lower than 0', () => {
      // given
      const option = generateOption({});

      // when
      const sell = () => option.sell(-1);

      // then
      expect(sell).toThrowError();
    });

    it('should throw error when sell count is greater than maxCount', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });

      // when
      const sell = () => option.sell(11);

      // then
      expect(sell).toThrowError();
    });

    it('should throw error when sell count is greater than maxCount - soldCount', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });
      option.sell(5);

      // when
      const sell = () => option.sell(6);

      // then
      expect(sell).toThrowError();
    });

    it('should increase soldCount when sell count is legal value', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });

      // when
      option.sell(5);

      // then
      expect(option.soldCount).toBe(5);
    });
  });

  describe('Cancel', () => {
    it('should throw error when cancel count is lower than 0', () => {
      // given
      const option = generateOption({});

      // when
      const cancel = () => option.cancel(-1);

      // then
      expect(cancel).toThrowError();
    });

    it('should throw error when cancel count is greater than soldCount', () => {
      // given
      const option = generateOption({});

      // when
      const cancel = () => option.cancel(1);

      // then
      expect(cancel).toThrowError();
    });

    it('should cancel sold count', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });
      option.sell(10);

      // when
      option.cancel(5);

      // then
      expect(option.isSoldOut()).toBeFalsy();
    });
  });

  describe('Change Max Count', () => {
    it('should throw error when max count is lower than 0', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });

      // when
      const changeMaxCount = () => option.changeMaxCount(-1);

      // then
      expect(changeMaxCount).toThrowError();
    });

    it('should throw error when max count is lower than sold count', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });
      option.sell(10);

      // when
      const changeMaxCount = () => option.changeMaxCount(9);

      // then
      expect(changeMaxCount).toThrowError();
    });

    it('should change max count', () => {
      // given
      const maxCount = 10;
      const option = generateOption({ maxCount });

      // when
      option.changeMaxCount(11);

      // then
      expect(option.maxCount).toBe(11);
    });
  });
});
