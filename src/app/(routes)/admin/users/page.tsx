"use client"

import StudentOptionsDrawer from "@/components/Admin/StudentOptionsDrawer";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { List } from "lucide-react"
import { useEffect, useState } from "react";

const users = [
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
];

export default function Users(): React.JSX.Element {

	const [editUserId, setEditUserId] = useState<string>("");

	const studentOptionsDrawerDisclosure = useDisclosure();
	const studentOptionsDrawerIsOpen = studentOptionsDrawerDisclosure.isOpen;
	const studentOptionsDrawerOnOpen = studentOptionsDrawerDisclosure.onOpen;
	const studentOptionsDrawerOnClose = studentOptionsDrawerDisclosure.onClose;

	const adminOptionsDrawerDisclosure = useDisclosure();
	const adminOptionsDrawerIsOpen = adminOptionsDrawerDisclosure.isOpen;
	const adminOptionsDrawerOnOpen = adminOptionsDrawerDisclosure.onOpen;
	const adminOptionsDrawerOnClose = adminOptionsDrawerDisclosure.onClose;

	const [students, setStudents] = useState<[]>([]);
	const [admins, setAdmins] = useState<[]>([]);
	const [isUsersDataLoading, setIsUserDataLoading] = useState<{
		students: boolean;
		admins: boolean;
	}>({
		students: true,
		admins: true
	});

	useEffect(() =>{
		setIsUserDataLoading(prev => ({admins: true, students: true}));
		(async() =>{
			try {
				axios.defaults.withCredentials = true;
				const getStudentDataResponse: AxiosResponse = await axios.post("/api/v3/admin/user/students", null, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				if(getStudentDataResponse.data.status === "FAIL"){
					return console.log(getStudentDataResponse.data.message);
				}
				setStudents(getStudentDataResponse.data.data);
				setIsUserDataLoading(prev => ({...prev, students: false}));
			}
			catch(e){
				console.log(e);
			}
		})();
		(async() =>{
			try {
				axios.defaults.withCredentials = true;
				const getStudentDataResponse: AxiosResponse = await axios.post("/api/v3/admin/user/admins", null, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				if(getStudentDataResponse.data.status === "FAIL"){
					return console.log(getStudentDataResponse.data.message);
				}
				setAdmins(getStudentDataResponse.data.data);
				setIsUserDataLoading(prev => ({...prev, admins: false}));
			}
			catch(e){
				console.log(e);
			}
		})();
	}, []);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="w-full">
					<h2 className="text-2xl font-semibold">Students</h2>
					<div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{students.map((student: any, i: number) => (
									<tr key={i} className="hover:bg-[#ebebeb] duration-300">
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.user_id}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.user_prefix.prefix_name} {student.user_firstname} {student.user_lastname}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row">
											<button onClick={() =>{
												studentOptionsDrawerOnOpen();
												setEditUserId(student.user_id);
											}}><List className="text-xl" /></button>
										</td>
									</tr>
								))}
								{/* Loading */}
								<tr hidden={!isUsersDataLoading.students}>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="w-full">
					<h2 className="text-2xl font-semibold">Admins</h2>
					<div className="bg-white shadow rounded-lg overflow-y-visible">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{admins.map((admin: any, i: number) => (
									<tr key={i} className="hover:bg-[#ebebeb] duration-300">
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.user_id}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user_prefix.prefix_name} {admin.user_firstname} {admin.user_lastname}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row">
											<button onClick={() =>{
												adminOptionsDrawerOnOpen();
												setEditUserId(admin.user_id);
											}}><List className="text-xl" /></button>
										</td>
									</tr>
								))}
								{/* Loading */}
								<tr hidden={!isUsersDataLoading.admins}>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
									<td className="px-6 py-4"><Spinner thickness='2px' speed='0.45s' emptyColor='gray.200' color='black.500' size='md' /></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<StudentOptionsDrawer isOpen={studentOptionsDrawerIsOpen} onOpen={studentOptionsDrawerOnOpen} onClose={studentOptionsDrawerOnClose} id={editUserId} />
		</>
	)
}

