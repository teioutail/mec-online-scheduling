export const reactSelectCustomStyles = {
    
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '35px',
        height: '35px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '35px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),

    indicatorSeparator: state => ({
        display: 'none',
    }),

    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '35px',
    }),
};