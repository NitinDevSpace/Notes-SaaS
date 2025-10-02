import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { FileText, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
	{
		name: "Total Notes",
		value: "24",
		change: "+12%",
		icon: FileText,
	},
	{
		name: "Team Members",
		value: "8",
		change: "+2",
		icon: Users,
	},
	{
		name: "Active Projects",
		value: "5",
		change: "+1",
		icon: TrendingUp,
	},
	{
		name: "Hours Saved",
		value: "142",
		change: "+23%",
		icon: Clock,
	},
];

const recentNotes = [
	{
		id: 1,
		title: "Q4 Planning Meeting Notes",
		date: "2 hours ago",
		author: "John Doe",
	},
	{
		id: 2,
		title: "Product Roadmap Ideas",
		date: "5 hours ago",
		author: "Jane Smith",
	},
	{
		id: 3,
		title: "Customer Feedback Summary",
		date: "1 day ago",
		author: "Mike Johnson",
	},
	{
		id: 4,
		title: "Sprint Retrospective",
		date: "2 days ago",
		author: "Sarah Williams",
	},
];

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-balance">
					Dashboard
				</h1>
				<p className="text-muted-foreground mt-1">
					Welcome back! Here's what's happening with your team.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.name}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.name}
							</CardTitle>
							<stat.icon className="w-4 h-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-muted-foreground mt-1">
								<span className="text-primary font-medium">{stat.change}</span>{" "}
								from last month
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activity */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Recent Notes</CardTitle>
						<CardDescription>
							Your team's latest notes and updates
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentNotes.map((note) => (
								<div key={note.id} className="flex items-start gap-4">
									<div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
										<FileText className="w-5 h-5 text-muted-foreground" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-sm truncate">{note.title}</p>
										<p className="text-xs text-muted-foreground">
											{note.author} • {note.date}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Common tasks and shortcuts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<button className="w-full text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors">
								<p className="font-medium text-sm">Create New Note</p>
								<p className="text-xs text-muted-foreground">
									Start writing a new note
								</p>
							</button>
							<button className="w-full text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors">
								<p className="font-medium text-sm">Invite Team Member</p>
								<p className="text-xs text-muted-foreground">
									Add someone to your organization
								</p>
							</button>
							<button className="w-full text-left px-4 py-3 rounded-lg bg-muted hover:bg-accent transition-colors">
								<p className="font-medium text-sm">View Analytics</p>
								<p className="text-xs text-muted-foreground">
									See your team's productivity
								</p>
							</button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
