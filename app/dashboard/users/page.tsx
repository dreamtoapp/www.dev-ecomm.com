import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getUsers,
} from "./action/actions";
import EditUser from "./component/EditUser";
import { View, ViewIcon } from "lucide-react";
import Link from "next/link";
import Map from "../../../components/Map";

export default async function UserManagement() {
  const users = await getUsers();
  return (
    <div className="p-</div>4">
      <h1 className="text-2xl font-bold mb-4">إدارة المستخدمين</h1>
      {/* جدول المستخدمين */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الجوال</TableHead>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">الإيميل</TableHead>
            <TableHead className="text-right">النوع</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-3 items-center justify-end">
                <Link href={{ pathname: `/dashboard/users/viewuser`, query: { id: user.id } }}>
                  <ViewIcon />
                </Link>

                <EditUser userId={user.id} />
                <Map latitude={parseFloat(user.latitude)} longitude={parseFloat(user.longitude)} />
                {/* <TomTomMap
                  latitude={25.1972}
                  longitude={55.2744}
                  placeName="Burj Khalifa"
                /> */}


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </div>
  );
}

