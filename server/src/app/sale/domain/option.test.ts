import { Money } from '@common/value';
import { ulid } from 'ulid';
import { PartyOption } from './option';
import { Policy } from './policy';

describe('Option', () => {
  const DEFAULT_OPTION_NO = 0;
  const ADDITIONAL_OPTION_NO = 1;
  const MINIMUM_PRICE = new Money(1000);
  const UNIT_PRICE = new Money(100);
  const MINIMUM_MAX_COUNT = 10;

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
      optionNo ?? 0,
      name ?? 'party option',
      price ?? new Money(1000),
      policy ?? new Policy(),
      maxCount ?? 10,
    );
  };

  describe('Price Validation', () => {
    it('should throw error when price is cheeper than rule', () => {
      // given
      const price = MINIMUM_PRICE.subtract(MINIMUM_PRICE.divide(2));

      // when
      const createOption = () => generateOption({ price });

      // then
      expect(createOption).toThrowError();
    });

    it('should throw error when price is illegal value', () => {
      // given
      const price = MINIMUM_PRICE.add(UNIT_PRICE.divide(2));

      // when
      const createOption = () => generateOption({ price });

      // then
      expect(createOption).toThrowError();
    });

    it('should create an instance when price is legal value', () => {
      // given
      const price = MINIMUM_PRICE;

      // when
      const option = generateOption({ price });

      // then
      expect(option).toBeDefined();
    });
  });

  describe('MaxCount Validation', () => {
    it('should throw error when maxCount is lower than rule', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT - 1;

      // when
      const createOption = () => generateOption({ maxCount });

      // then
      expect(createOption).toThrowError();
    });

    it('should create an instance when maxCount is legal value', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT;

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
        const optionNo = DEFAULT_OPTION_NO;
        const option = generateOption({ optionNo });

        // when
        const result = option.isDefault();

        // then
        expect(result).toBeTruthy();
      });

      it('should return false when option is not default', () => {
        // given
        const optionNo = ADDITIONAL_OPTION_NO;
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
        const optionNo = ADDITIONAL_OPTION_NO;
        const option = generateOption({ optionNo });

        // when
        const result = option.isAdditional();

        // then
        expect(result).toBeTruthy();
      });

      it('should return false when option is not additional', () => {
        // given
        const optionNo = DEFAULT_OPTION_NO;
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
        const maxCount = MINIMUM_MAX_COUNT;
        const option = generateOption({ maxCount });
        option.sell(maxCount);

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
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });

      // when
      const sell = () => option.sell(MINIMUM_MAX_COUNT + 1);

      // then
      expect(sell).toThrowError();
    });

    it('should throw error when sell count is greater than maxCount - soldCount', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });
      option.sell(MINIMUM_MAX_COUNT - 1);

      // when
      const sell = () => option.sell(2);

      // then
      expect(sell).toThrowError();
    });

    it('should increase soldCount when sell count is legal value', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });

      // when
      option.sell(maxCount);

      // then
      expect(option.isSoldOut()).toBeTruthy();
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
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });
      option.sell(maxCount);

      // when
      option.cancel(1);

      // then
      expect(option.isSoldOut()).toBeFalsy();
    });
  });

  describe('Change Max Count', () => {
    it('should throw error when max count is lower than 0', () => {
      // given
      const option = generateOption({});

      // when
      const changeMaxCount = () => option.changeMaxCount(-1);

      // then
      expect(changeMaxCount).toThrowError();
    });

    it('should throw error when max count is lower than sold count', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });
      option.sell(maxCount);

      // when
      const changeMaxCount = () => option.changeMaxCount(maxCount - 1);

      // then
      expect(changeMaxCount).toThrowError();
    });

    it('should change max count', () => {
      // given
      const maxCount = MINIMUM_MAX_COUNT;
      const option = generateOption({ maxCount });

      // when
      option.changeMaxCount(maxCount + 1);

      // then
      expect(option.maxCount).toBe(maxCount + 1);
    });
  });
});
