function SearchPlace(props) {
    return (
        <>
            <div class="input-form mt-5">
                <input onChange={props.change} value={props.name} placeholder="Search Place" type="text" class="form-control" />
            </div>
        </>
    )
}

export default SearchPlace