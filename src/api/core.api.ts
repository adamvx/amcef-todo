import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class CoreApi {
	private axios: AxiosInstance;
	constructor(private baseURL: string) {
		this.axios = axios.create({
			baseURL: baseURL,
			timeout: 5000,
		});
	}

	request = async <T extends any>(
		url: string,
		config?: Omit<AxiosRequestConfig, "url" | "baseURL">
	): Promise<T> => {
		try {
			const { data } = await this.axios.request<T>({
				url,
				baseURL: this.baseURL,
				...config,
			});
			return data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
}

const coreApi = new CoreApi(
	"https://6581abc73dfdd1b11c43e43b.mockapi.io/api/v1"
);
export default coreApi;
