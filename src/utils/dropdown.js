let dropdown;

function setTopLevelDropDown(dropdownRef) {
  dropdown = dropdownRef;
}

function alertWithType(...props) {
  dropdown.alertWithType(...props);
}

function close() {
  dropdown.close();
}

export default {
  setTopLevelDropDown,
  alertWithType,
  close,
};
