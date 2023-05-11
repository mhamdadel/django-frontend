function FormGroup({id, title, placeholder}) {
    return (
        <div class="form-group">
            <div class="col-xs-6">
                <label for="first_name">
                    <h4>{title}</h4>
                </label>
                <input
                    type="text"
                    class="form-control"
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    title="enter your first name if any."
                />
            </div>
        </div>
    );
}

export default FormGroup;