import { api } from "./http";
import type {
	FromListResponse,
	From,
	CreateFromRequest,
	CreateFromResponse,
	UpdateFromRequest,
	UpdateFromResponse,
	DeleteFromResponse,
} from "@/types/from";

export const getFromList = async (): Promise<From[]> => {
	const { data } = await api.get<FromListResponse>("/froms");
	return data.data.froms;
};

export const createFrom = async (
	payload: CreateFromRequest
): Promise<CreateFromResponse> => {
	const { data } = await api.post<CreateFromResponse>("/froms", payload);
	return data;
};

export const updateFrom = async (
	fromId: number,
	payload: UpdateFromRequest
): Promise<UpdateFromResponse> => {
	const { data } = await api.patch<UpdateFromResponse>(
		`/froms/${fromId}`,
		payload
	);
	return data;
};

export const deleteFrom = async (
	fromId: number
): Promise<DeleteFromResponse> => {
	const { data } = await api.delete<DeleteFromResponse>(
		`/froms/${fromId}`
	);
	return data;
};


