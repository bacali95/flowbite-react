import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Flowbite, type CustomFlowbiteTheme } from '../Flowbite';
import { RangeSlider } from './RangeSlider';

describe('Components / RangeSlider', () => {
  describe('A11y', () => {
    it('should have `role="progressbar"` by default', () => {
      render(<RangeSlider />);

      expect(rangeSlider()).toBeInTheDocument();
    });

    it('should be able to use any other role permitted for `RangeSlider`', () => {
      // eslint-disable-next-line jsx-a11y/aria-role
      render(<RangeSlider role="rangeinput" />);

      expect(rangeSlider('rangeinput')).toBeInTheDocument();
    });
  });

  describe('Keyboard interactions', () => {
    it('should focus when `Tab` is pressed', async () => {
      const user = userEvent.setup();
      render(<RangeSlider />);

      await user.tab();

      expect(rangeSlider()).toHaveFocus();
    });

    it('should be possible to `Tab` out', async () => {
      const user = userEvent.setup();
      render(
        <>
          <RangeSlider />
          <RangeSlider />
          <RangeSlider />
        </>,
      );

      const rangeSliderElements = rangeSliders();

      await user.tab();

      expect(rangeSliderElements[0]).toHaveFocus();

      await user.tab();

      expect(rangeSliderElements[1]).toHaveFocus();

      await user.tab();

      expect(rangeSliderElements[2]).toHaveFocus();
    });

    it('should not trigger `onChange` when `Space` is pressed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<RangeSlider onChange={handleChange} />);

      await user.tab();

      expect(rangeSlider()).toHaveFocus();

      await user.keyboard('[Space]');

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should not trigger `onChange` when `Enter` is pressed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<RangeSlider onChange={handleChange} />);

      await user.tab();

      expect(rangeSlider()).toHaveFocus();

      await user.keyboard('[Enter]');

      expect(handleChange).not.toHaveBeenCalled();
    });

    /**
     * Test Name: Should trigger `onChange` when `Arrow` key pressed
     *
     * This test is not testable because there is no support for
     * input[type="range"] in the user-event library.
     *
     * Issues:
     * https://github.com/testing-library/user-event/issues/1067
     * https://github.com/testing-library/user-event/issues/871
     *
     * TODO: Once these issues get fixed, we will add this test case.
     *
     */
  });

  describe('Props', () => {
    it('should allow HTML attributes for `<input type="range">`s', () => {
      render(<RangeSlider formAction="post.php" min={4} max={10} step={0.5} />);
      const rangeSliderElement = rangeSlider();
      expect(rangeSliderElement).toHaveAttribute('formAction', 'post.php');
      expect(rangeSliderElement).toHaveAttribute('min', '4');
      expect(rangeSliderElement).toHaveAttribute('max', '10');
      expect(rangeSliderElement).toHaveAttribute('step', '0.5');
    });

    it('should be disabled when `disabled={true}`', () => {
      render(<RangeSlider disabled />);

      expect(rangeSlider()).toBeDisabled();
    });

    it('should be required when `required={true}`', () => {
      render(<RangeSlider required={true} />);
      expect(rangeSlider()).toHaveAttribute('required');
    });

    it('should allow ref as prop', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RangeSlider ref={ref} name="range_slider_name" />);
      expect(ref.current?.name).toBe('range_slider_name');
    });

    it('should allow className as prop', () => {
      const className = 'dummy-custom-class-name';

      render(<RangeSlider className={className} />);
      expect(rangeSlider()).toHaveClass(className);
    });
  });

  describe('Rendering', () => {
    it('should render with no props', () => {
      render(<RangeSlider />);
      expect(rangeSlider()).toBeInTheDocument();
    });
  });

  describe('Theme', () => {
    it('should use `base` classes', () => {
      const theme: CustomFlowbiteTheme = {
        rangeSlider: {
          base: 'dummy-range-slider-field-input-base-classes',
        },
      };

      render(
        <Flowbite theme={{ theme }}>
          <RangeSlider />
        </Flowbite>,
      );

      expect(rangeSlider()).toHaveClass('dummy-range-slider-field-input-base-classes');
    });

    it('should use `sizes` classes', () => {
      const theme: CustomFlowbiteTheme = {
        rangeSlider: {
          sizes: {
            lg: 'dummy-range-slider-field-input-sizes-lg-classes',
          },
        },
      };

      render(
        <Flowbite theme={{ theme }}>
          <RangeSlider sizing="lg" />
        </Flowbite>,
      );

      expect(rangeSlider()).toHaveClass('dummy-range-slider-field-input-sizes-lg-classes');
    });
  });

  describe('Theme as a prop', () => {
    it('should use `base` classes', () => {
      const theme: CustomFlowbiteTheme['rangeSlider'] = {
        base: 'dummy-range-slider-field-input-base-classes',
      };

      render(<RangeSlider theme={theme} />);

      expect(rangeSlider()).toHaveClass('dummy-range-slider-field-input-base-classes');
    });

    it('should use `sizes` classes', () => {
      const theme: CustomFlowbiteTheme['rangeSlider'] = {
        sizes: {
          lg: 'dummy-range-slider-field-input-sizes-lg-classes',
        },
      };

      render(<RangeSlider sizing="lg" theme={theme} />);

      expect(rangeSlider()).toHaveClass('dummy-range-slider-field-input-sizes-lg-classes');
    });
  });
});

const rangeSlider = (role = 'slider') => screen.getByRole(role);
const rangeSliders = (role = 'slider') => screen.getAllByRole(role);
