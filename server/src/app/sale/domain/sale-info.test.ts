import { Money } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import { ulid } from 'ulid';
import { Policy } from './policy';
import { SaleInfo } from './sale-info';

describe('SaleInfo', () => {
  const partyId = ulid();
  let info: SaleInfo;

  beforeEach(() => {
    info = new SaleInfo(partyId, ZonedDateTime.now().plusDays(10));
  });

  const DEFAULT_OPTION_MAX_COUNT = 50;
  const DEFAULT_ADDITIONAL_OPTION_MAX_COUNT = 10;
  const DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS = 5;

  const generateDefaultOption = () =>
    info.addOption({
      name: 'default',
      price: new Money(1000),
      policy: new Policy(),
      maxCount: DEFAULT_OPTION_MAX_COUNT,
    });

  const generateAdditionalOptions = (count: number) => {
    for (let i = 0; i < count; i++) {
      info.addOption({
        name: `additional-${i}`,
        price: new Money(1000),
        policy: new Policy(),
        maxCount: DEFAULT_ADDITIONAL_OPTION_MAX_COUNT,
      });
    }
  };

  describe('validate max count', () => {
    it('should pass when defulat max count is greater than sum of inherited max count', () => {
      // given
      generateDefaultOption();

      // when
      const addOptions = () =>
        generateAdditionalOptions(DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS);

      // then
      expect(addOptions).not.toThrowError();
    });

    it('should throw error when defulat max count is less than sum of inherited max count', () => {
      // given
      generateDefaultOption();

      // when
      const addOptions = () =>
        generateAdditionalOptions(DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS + 1);

      // then
      expect(addOptions).toThrowError();
    });
  });

  describe('change sale start at', () => {
    it('should throw error when sale start at is already started', () => {
      // given
      const startedInfo = new SaleInfo(partyId, ZonedDateTime.now());

      // when
      const changeSaleStartAt = () =>
        startedInfo.changeSaleStartAt(ZonedDateTime.now().plusHours(1));
      // then
      expect(changeSaleStartAt).toThrowError();
    });

    it('should pass when sale start at is not started yet', () => {
      // given
      const notStartedInfo = new SaleInfo(
        partyId,
        ZonedDateTime.now().plusDays(1),
      );

      // when
      const changeSaleStartAt = () =>
        notStartedInfo.changeSaleStartAt(ZonedDateTime.now().plusHours(1));

      // then
      expect(changeSaleStartAt).not.toThrowError();
    });
  });

  describe('sell option', () => {
    it('should throw error when option is not exist', () => {
      // given
      generateDefaultOption();

      // when
      const sellOption = () => info.sell(2, 1);

      // then
      expect(sellOption).toThrowError();
    });

    it('should throw error when option is already sold out', () => {
      // given
      generateDefaultOption();
      info.sell(0, DEFAULT_OPTION_MAX_COUNT);

      // when
      const sellOption = () => info.sell(0, 1);

      // then
      expect(info.isSoldOut()).toBe(true);
      expect(sellOption).toThrowError();
    });

    it('should pass when option is not sold out', () => {
      // given
      generateDefaultOption();

      // when
      const sellOption = () => info.sell(0, 1);

      // then
      expect(sellOption).not.toThrowError();
      expect(info.isSoldOut()).toBe(false);
    });

    it('should sell default option when option policy is inherit', () => {
      // given
      generateDefaultOption();
      generateAdditionalOptions(DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS);

      // when
      Array.from({ length: DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS }).forEach(
        (_, i) => {
          info.sell(i + 1, DEFAULT_ADDITIONAL_OPTION_MAX_COUNT);
        },
      );

      // then
      expect(info.isSoldOut()).toBeTruthy();
    });

    it('should not sell default option when option policy is not inherit', () => {
      // given
      const policy = new Policy();
      policy.limitType = 'INDEPENDENT';
      generateDefaultOption();
      info.addOption({
        name: 'indepenedent',
        price: new Money(1000),
        policy,
        maxCount: DEFAULT_OPTION_MAX_COUNT,
      });
      generateAdditionalOptions(DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS - 1);

      // when
      Array.from({ length: DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS }).forEach(
        (_, i) => {
          info.sell(i + 1, DEFAULT_ADDITIONAL_OPTION_MAX_COUNT);
        },
      );

      // then
      expect(info.isSoldOut()).toBeFalsy();
    });
  });

  describe('cancel option', () => {
    it('should throw error when option is not exist', () => {
      // given
      generateDefaultOption();

      // when
      const cancelOption = () => info.cancel(2, 1);

      // then
      expect(cancelOption).toThrowError();
    });

    it('should throw error when option did not sell yet', () => {
      // given
      generateDefaultOption();

      // when
      const cancelOption = () => info.cancel(0, 1);

      // then
      expect(cancelOption).toThrowError();
    });

    it('should pass when option is sold', () => {
      // given
      generateDefaultOption();
      info.sell(0, 1);

      // when
      const cancelOption = () => info.cancel(0, 1);

      // then
      expect(cancelOption).toThrowError();
    });

    it('should cancel default option when option policy is inherit', () => {
      // given
      generateDefaultOption();
      generateAdditionalOptions(DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS);
      Array.from({ length: DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS }).forEach(
        (_, i) => {
          info.sell(i + 1, DEFAULT_ADDITIONAL_OPTION_MAX_COUNT);
        },
      );

      // when
      Array.from({ length: DEFAULT_NUMBER_OF_ADDITIONAL_OPTIONS }).forEach(
        (_, i) => {
          info.cancel(i + 1, DEFAULT_ADDITIONAL_OPTION_MAX_COUNT);
        },
      );

      // then
      expect(info.isSoldOut()).toBeFalsy();
    });
  });
});
