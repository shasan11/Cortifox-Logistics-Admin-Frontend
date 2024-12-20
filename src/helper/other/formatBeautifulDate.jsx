function formatBeautifulDate(dateString) {
    const date = new Date(dateString);

  // Formatting the date as MM/DD/YYYY
  return date.toLocaleDateString('en-US');
  }

export default formatBeautifulDate;