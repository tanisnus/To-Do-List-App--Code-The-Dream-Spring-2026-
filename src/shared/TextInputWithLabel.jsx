function TextInputWithLabel({
    elementId,
    labelText,
    onChange = () => {},
    ref,
    value,
    maxLength,
    type = 'text',
}) {
    return (
        <>
            <label 
                htmlFor={elementId}> 
                {labelText}
            </label>
            <input 
                type={type}
                id={elementId}
                ref={ref}
                value={value}
                maxLength={maxLength}
                onChange={onChange}
            />
        </>
    )
}

export default TextInputWithLabel;