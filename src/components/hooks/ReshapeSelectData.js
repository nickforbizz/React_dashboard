function ReshapeSelectData(data, extractiondata) {
  if (data && data.length > 0) {
    let new_data = data.map((item, i) => {
      let new_item = {};
      if (extractiondata.length > 0) {
        new_item = {
          key: item[extractiondata[0]],
          value: item[extractiondata[1]],
        };
      }
      return new_item;
    });
    return new_data;
  }
  return data;
}

export default ReshapeSelectData;
