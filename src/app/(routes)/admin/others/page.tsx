"use client"

import AddStudentDrawer from "@/components/Admin/AddStudentDrawer";
import AddDepartmentDrawer from "@/components/Admin/Department/AddDepartmentDrawer";
import AddPrefixDrawer from "@/components/Admin/Prefix/AddPrefixDrawer";
import AddRoleDrawer from "@/components/Admin/Role/AddRoleDrawer";
import StudentOptionsDrawer from "@/components/Admin/StudentOptionsDrawer";
import { getCookies } from "@/utils/getCookies";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { List } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Other(): React.JSX.Element {
	const router = useRouter();
	useEffect(() =>{
		const cookies = getCookies(document.cookie);
		if(!cookies.token) {
			return router.push("/login");
		}
	}, []);


	const [refetchData, setRefetchData] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<{
        department: boolean;
        role: boolean;
        prefix: boolean;
    }>({
        department: true,
        role: true,
        prefix: true
    });

    interface DepartmentInformations {
        department_id: string;
        department_fullname_th: string;
        department_fullname_en: string;
        department_type: string;
    }
	const [departmentInformationsData, setDepartmentInformationsData] = useState<DepartmentInformations[]>([]);
    useEffect(() => {
        setIsLoading(prev => ({
            ...prev,
            department: true,
        }));
        (async() => {
            try {
                axios.defaults.withCredentials = true;
                const response: AxiosResponse = await axios.post("/api/v3/admin/options/department/all", null, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				if(response.data.status === "FAIL"){
					console.log(response.data.message);
					return;
				}
				setDepartmentInformationsData(response.data.data.map((d: any): DepartmentInformations => ({
					department_id: d.department_id,
					department_fullname_th: d.department_fullname_th,
					department_fullname_en: d.department_fullname_en,
					department_type: d.department_type
				})));
				setIsLoading(prev => ({
					...prev,
					department: false
				}));
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [refetchData]);

    interface RoleInformations {
        role_id: number;
        role_name: string;
        role_description: string;
    }
    const [roleInformationsData, setRoleInformationsData] = useState<RoleInformations[]>([]);
	useEffect(() => {
        setIsLoading(prev => ({
            ...prev,
            role: true,
        }));
        (async() => {
            try {
                axios.defaults.withCredentials = true;
                const response: AxiosResponse = await axios.post("/api/v3/admin/options/role/all", null, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				if(response.data.status === "FAIL"){
					console.log(response.data.message);
					return;
				}
				setRoleInformationsData(response.data.data.map((r: any): RoleInformations => ({
					role_id: r.role_id,
					role_name: r.role_name,
					role_description: r.role_description
				})));
				setIsLoading(prev => ({
					...prev,
					role: false
				}));
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [refetchData]);

    interface PrefixInformations {
        prefix_id: number;
        prefix_name: string;
        prefix_name_short: string;
        gender: string;
    }
    const [prefixInformationsData, setPrefixInformationsData] = useState<PrefixInformations[]>([]);
	useEffect(() => {
        setIsLoading(prev => ({
            ...prev,
            prefix: true,
        }));
        (async() => {
            try {
                axios.defaults.withCredentials = true;
                const response: AxiosResponse = await axios.post("/api/v3/admin/options/prefix/all", null, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				if(response.data.status === "FAIL"){
					console.log(response.data.message);
					return;
				}
				setPrefixInformationsData(response.data.data.map((p: any): PrefixInformations => ({
					prefix_id: p.prefix_id,
					prefix_name: p.prefix_name,
					prefix_name_short: p.prefix_name_short,
					gender: p.gender
				})));
				setIsLoading(prev => ({
					...prev,
					prefix: false
				}));
            }
            catch(e){
                console.log(e);
            }
        })();
    }, [refetchData]);

	const addDepartmentDrawerDisclosure = useDisclosure();
	const addDepartmentDrawerIsOpen = addDepartmentDrawerDisclosure.isOpen;
	const addDepartmentDrawerOnOpen = addDepartmentDrawerDisclosure.onOpen;
	const addDepartmentDrawerOnClose = addDepartmentDrawerDisclosure.onClose;

	const addRoleDrawerDisclosure = useDisclosure();
	const addRoleDrawerIsOpen = addRoleDrawerDisclosure.isOpen;
	const addRoleDrawerOnOpen = addRoleDrawerDisclosure.onOpen;
	const addRoleDrawerOnClose = addRoleDrawerDisclosure.onClose;

	const addPrefixDrawerDisclosure = useDisclosure();
	const addPrefixDrawerIsOpen = addPrefixDrawerDisclosure.isOpen;
	const addPrefixDrawerOnOpen = addPrefixDrawerDisclosure.onOpen;
	const addPrefixDrawerOnClose = addPrefixDrawerDisclosure.onClose;

	const [departmentSelectedId, setDepartmentSelectedId] = useState<string>("");
	const [roleSelectedId, setRoleSelectedId] = useState<number>(-1);
	const [prefixSelectedId, setPrefixSelectedId] = useState<number>(-1);


	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

				<div className="w-full">
					<div className="flex flex-row justify-between mb-2 items-center mx-5">
						<h2 className="text-2xl font-semibold">Departments</h2>
						<button className="text-xl px-5 py-1 border-[1px] rounded-md hover:bg-[#d6d6d6] active:bg-[#ededed] duration-300" onClick={() => addDepartmentDrawerOnOpen()}>Add</button>
					</div>
					<div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:inline-flex">ID</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
									<th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{departmentInformationsData.map((d: DepartmentInformations, i: number) => (
									<tr key={i} className="hover:bg-[#ebebeb] duration-300" hidden={isLoading.department}>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-900 hidden xl:inline-flex">{d.department_id}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{d.department_fullname_th}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{d.department_type}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500 flex flex-row place-content-end mr-5">
											<button onClick={() =>{
												// studentOptionsDrawerOnOpen();
												setDepartmentSelectedId(d.department_id);
											}}>
												<List className="text-xl" />
											</button>
										</td>
									</tr>
								))}
								{/* Loading */}
								<tr hidden={!isLoading.department}>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="w-full">
				    <div className="flex flex-row justify-between mb-2 items-center mx-5">
						<h2 className="text-2xl font-semibold">Roles</h2>
						<button className="text-xl px-5 py-1 border-[1px] rounded-md hover:bg-[#d6d6d6] active:bg-[#ededed] duration-300" onClick={() => addRoleDrawerOnOpen()}>Add</button>
					</div>
					<div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
									<th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{roleInformationsData.map((r: RoleInformations, i: number) => (
									<tr key={i} className="hover:bg-[#ebebeb] duration-300" hidden={isLoading.role}>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-900">{r.role_id}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{r.role_name}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{r.role_description}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500 flex flex-row place-content-end mr-5">
											<button onClick={() =>{
												// adminOptionsDrawerOnOpen();
												setRoleSelectedId(r.role_id);
											}}>
												<List className="text-xl" />
											</button>
										</td>
									</tr>
								))}
								{/* Loading */}
								<tr hidden={!isLoading.role}>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

                <div className="w-full">
				    <div className="flex flex-row justify-between mb-2 items-center mx-5">
						<h2 className="text-2xl font-semibold">Prefix</h2>
						<button className="text-xl px-5 py-1 border-[1px] rounded-md hover:bg-[#d6d6d6] active:bg-[#ededed] duration-300" onClick={() => addPrefixDrawerOnOpen()}>Add</button>
					</div>
					<div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short</th>
									<th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
									<th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{prefixInformationsData.map((p: PrefixInformations, i: number) => (
									<tr key={i} className="hover:bg-[#ebebeb] duration-300" hidden={isLoading.prefix}>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-900">{p.prefix_id}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{p.prefix_name}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{p.prefix_name_short}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500">{p.gender}</td>
										<td className="px-3 py-4 whitespace-nowrap text-wrap text-sm text-gray-500 flex flex-row place-content-end mr-5">
											<button onClick={() =>{
												// adminOptionsDrawerOnOpen();
												setPrefixSelectedId(p.prefix_id);
											}}>
												<List className="text-xl" />
											</button>
										</td>
									</tr>
								))}
								{/* Loading */}
								<tr hidden={!isLoading.prefix }>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-3 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<AddDepartmentDrawer isOpen={addDepartmentDrawerIsOpen} onOpen={addDepartmentDrawerOnOpen} onClose={addDepartmentDrawerOnClose} refetch={setRefetchData} />
			<AddPrefixDrawer isOpen={addPrefixDrawerIsOpen} onOpen={addPrefixDrawerOnOpen} onClose={addPrefixDrawerOnClose} refetch={setRefetchData} />
			<AddRoleDrawer isOpen={addRoleDrawerIsOpen} onOpen={addRoleDrawerOnOpen} onClose={addRoleDrawerOnClose} refetch={setRefetchData} />
		</>
	)
}

