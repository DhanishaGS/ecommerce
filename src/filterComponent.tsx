import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { filterProducts } from "./store/slice/filterProductsSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { Item } from "./types/ItemInterface";

const FilterComponent = () => {
  const [show, setShow] = useState(false);
  const products = useAppSelector((state) => state.filterProducts.items);
  const uniqueCategories: string[] = Array.from(
    new Set(products.map((product: Item) => product.category))
  );
  const dispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState( useAppSelector((state) => state.filterProducts.filteredItems) ?? []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFilter = (event: React.SyntheticEvent, value: string[]) => {
    setSelectedCategories(value);
    // dispatch(filterProducts({ category: value }));
  };
  const applyFilters = () => {
    dispatch(filterProducts({ category: selectedCategories }));
    handleClose();
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ margin: "20px" }}
        >
          Filter Products
        </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Total Products: {products.length}</p>
          <Autocomplete
            onChange={handleFilter}
            multiple
            id="tags-outlined"
            options={uniqueCategories}
            value={selectedCategories}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Category"
                placeholder="Select categories..."
              />
            )}
          />
          <div style={{ marginTop: "20px" }}>
            <Button variant="secondary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterComponent;
