import React from 'react';
import styled from 'styled-components';

import colors from './colors';

const StyledFilter = styled.div`
  width: 232px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h4`
  padding: 0 20px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const StyledFilterItem = styled.div`
  font-size: 13px;
  font-weight: 400;
  background-color: transparent;
  transition: all 0.2s ease;
  &:last-child {
    margin-bottom: 10px;
  }
  &:hover {
    background-color: #f1fcff;
  }
  label {
    display: block;
    height: 36px;
    width: 100%;
    padding: 0 20px;
    line-height: 36px;
    cursor: pointer;
  }
  .checkbox {
    margin-right: 9px;
  }
  .checkbox__field {
    display: none;
    &:checked + .checkbox__face {
      border: 1px solid ${colors.blue};
      &:after {
        opacity: 1;
      }
    }
  }
  .checkbox__face {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-bottom: -5px;
    border: 1px solid #d2d5d6;
    border-radius: 3px;
    transition: all 0.2s ease;
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 5px;
      left: 4px;
      width: 9px;
      height: 7px;
      background: var(
        --checkbox-check-mark,
        url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI3IiB2aWV3Qm94PSIwIDAgOSA3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTEuNSAzLjVsMiAyIDQtNCIgc3Ryb2tlPSIjMjE5NkYzIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=)
          no-repeat
      );
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
  }
`;

const allFilters = [
  {
    label: 'Без пересадок',
    value: 0,
  },
  {
    label: '1 пересадка',
    value: 1,
  },
  {
    label: '2 пересадки',
    value: 2,
  },
  {
    label: '3 пересадки',
    value: 3,
  },
];

type FilterItemProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
};

const FilterItem = React.memo(({ label, onChange, checked }: FilterItemProps) => (
  <StyledFilterItem>
    <label htmlFor={label}>
      <span className="checkbox">
        <input
          className="checkbox__field"
          type="checkbox"
          id={label}
          onChange={onChange}
          checked={checked}
        />
        <span className="checkbox__face" />
      </span>
      {label}
    </label>
  </StyledFilterItem>
));

type FilterProps = {
  numOfTransfers: number[];
  changeFilter: (numOfTransfers: Array<number | never>) => void;
};

class Filter extends React.PureComponent<FilterProps> {
  static FilterItem = FilterItem;

  changeAllFilters: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { checked } = event.target;
    const { changeFilter } = this.props;
    if (checked) {
      changeFilter([0, 1, 2, 3]);
    } else {
      changeFilter([]);
    }
  };

  changeFilter = (value: number): React.ChangeEventHandler<HTMLInputElement> => event => {
    const { checked } = event.target;
    const { changeFilter, numOfTransfers } = this.props;
    if (checked) {
      changeFilter([...numOfTransfers, value]);
    } else {
      changeFilter(numOfTransfers.filter(item => item !== value));
    }
  };

  render() {
    const { numOfTransfers } = this.props;

    return (
      <StyledFilter>
        <Title>Количество пересадок</Title>
        <Filter.FilterItem
          label="Все"
          checked={numOfTransfers.length >= allFilters.length}
          onChange={this.changeAllFilters}
        />
        {allFilters.map(({ label, value }) => (
          <Filter.FilterItem
            key={label}
            label={label}
            checked={numOfTransfers.includes(value)}
            onChange={this.changeFilter(value)}
          />
        ))}
      </StyledFilter>
    );
  }
}

export default Filter;
