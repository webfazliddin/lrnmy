export const useGlobal = () => {
  const getColor = (item: any) => {
    if (
      item.statusId == 24 ||
      item.statusId == 25 ||
      item.statusId == 23 ||
      item.statusId == 5 ||
      item.stateId == 2 ||
      item.statusId == 3 ||
      item.statusId == 10
    ) {
      return "error";
    } else if (
      item.statusId == 13 ||
      item.statusId == 11 ||
      item.statusId == 26 ||
      item.statusId == 9 ||
      item.statusId == 14 ||
      item.statusId == 16 ||
      item.statusId == 17 ||
      item.statusId == 18 ||
      item.statusId == 21 ||
      item.stateId == 1 ||
      item.statusId == 2
    ) {
      return "success";
    } else if (item.statusId == 6 || item.statusId == 8) {
      return "warning";
    } else if (item.statusId == 7) {
      return "info";
    } else if (item.statusId == 1) {
      return "";
    } else {
      return "primary";
    }
  };

  const forceFileDownload = (response: any, name: string, type?: string) => {
    var blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    if (type) {
      link.setAttribute("download", name + type);
    } else {
      link.setAttribute("download", name);
    }

    document.body.appendChild(link);
    link.click();
  };

  const disabledBeforeDays = (date: any) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const isoFormat = new Date(`${year}-${month + 1}-${day}T00:00`);
    return date < isoFormat;
  };

  const disableAfterTodayDays = (date: any) => {
    const today = new Date();
    return date > today;
  };
  const parseNumber = (value: number) => {
    return Intl.NumberFormat(undefined, {}).format(value);
  };

  const makeGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * length) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return {
    getColor,
    forceFileDownload,
    disabledBeforeDays,
    disableAfterTodayDays,
    parseNumber,
    makeGuid
  };
};
