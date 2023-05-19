class GetEnvData {
  public getData(key: string) {
    const data = process.env[key];
    if (!data) {
      throw new Error("No data found");
    }
    return data;
  }
}
export default GetEnvData;
