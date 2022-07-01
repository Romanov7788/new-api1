
const PWDCheck = ({ checks }) => {
    return (
        <div>
            <p style={checks.capsLetterCheck ? { color: 'green' } : { color: 'red' }}>Must be 1 Capital Letter</p>
            <p style={checks.numberCheck ? { color: 'green' } : { color: 'red' }}>Must contain number</p>
            <p style={checks.pwdLengthCheck ? { color: 'green' } : { color: 'red' }}>Must be 8 Chars long</p>
            <p style={checks.specialCharCheck ? { color: 'green' } : { color: 'red' }}>Must contain special charact</p>
        </div>
    );
}

export default PWDCheck;