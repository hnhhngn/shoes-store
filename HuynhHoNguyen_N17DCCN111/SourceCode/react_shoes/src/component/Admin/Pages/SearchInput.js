import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

const SearchInput = () => {

  const hand=()=>{
    alert("clicked")
  }

  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        onClick = {hand}
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input 
       style={{marginTop:20,width: 200}}
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
  );
};

export default SearchInput;
