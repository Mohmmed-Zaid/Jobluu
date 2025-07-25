import React, { useState, useRef, useEffect } from "react";
import {
  IconMapPin,
  IconStar,
  IconBriefcase,
  IconCalendar,
  IconShare,
  IconBookmark,
  IconPencil,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  Button,
  Tabs,
} from "@mantine/core";
import ExpCard from "./ExpCard";
import RecommendTalent from "./RecommendTalent";
import CertificateCard from "./CertificateCard";
import Header from "../Header/Header";
import Footer from "../footer/Footer";

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState("/avatar.png");
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: "Jarrod Wood",
    title: "Software Engineer",
    location: "Pune, India",
    experience: "5+ Years Experience",
  });

  const [about, setAbout] = useState(
    "Experienced software engineer passionate about building scalable web applications and clean user experiences. Specialized in React, Node.js, and system design."
  );

  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "AWS",
    "MongoDB",
  ]);
  const [newSkill, setNewSkill] = useState("");

  // Fixed useEffect with proper dependency array and error handling
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Make sure 'user' and 'getProfile' are properly imported/defined
        const data = await getProfile(user.id);
        console.log('Profile data:', data);
        
        // Update state with fetched data
        if (data) {
          setProfileData({
            name: data.name || profileData.name,
            title: data.title || profileData.title,
            location: data.location || profileData.location,
            experience: data.experience || profileData.experience,
          });
          
          if (data.about) setAbout(data.about);
          if (data.skills) setSkills(data.skills);
          if (data.avatar) setAvatar(data.avatar);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // You might want to show a toast notification or error message to user
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this runs once on mount

  // Function to save profile changes
  const handleSaveProfile = async () => {
    try {
      const profilePayload = {
        ...profileData,
        about,
        skills,
        avatar,
      };
      
      const response = await saveProfile(user.id, profilePayload);
      console.log('Profile saved:', response);
      setEditOpen(false);
      // You might want to show a success message
    } catch (error) {
      console.error('Error saving profile:', error);
      // You might want to show an error message
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full max-w-4xl mx-auto mt-8 mb-16 bg-mine-shaft-900 rounded-2xl p-8 text-center">
          <div className="text-white">Loading profile...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Modal
        opened={editOpen}
        onClose={() => setEditOpen(false)}
        withCloseButton={false}
        centered
        radius="xl"
        size="auto"
        overlayProps={{ blur: 2, backgroundOpacity: 0.6 }}
        styles={{
          content: {
            padding: 0,
            backgroundColor: "transparent",
            borderRadius: "1.5rem",
          },
        }}
      >
        <div className="w-[420px] bg-mine-shaft-900 text-white rounded-l-[30px] rounded-r-[40px] overflow-hidden shadow-2xl border border-bright-sun-400">
          <div className="px-6 py-4 border-b border-slate-700 bg-mine-shaft-800 rounded-tl-3xl">
            <h2 className="text-lg font-bold text-yellow-400">Edit Profile</h2>
          </div>

          {/* Tab Navigation */}
          <Tabs defaultValue="basic" className="px-6 py-5">
            <Tabs.List grow className="mb-4">
              <Tabs.Tab value="basic" className="text-yellow-400">Basic Info</Tabs.Tab>
              <Tabs.Tab value="about" className="text-yellow-400">About</Tabs.Tab>
              <Tabs.Tab value="skills" className="text-yellow-400">Skills</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" className="space-y-4">
              <TextInput
                label="Full Name"
                variant="filled"
                radius="md"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
              <TextInput
                label="Job Title"
                variant="filled"
                radius="md"
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
              <TextInput
                label="Location"
                variant="filled"
                radius="md"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
              <TextInput
                label="Experience"
                variant="filled"
                radius="md"
                value={profileData.experience}
                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
            </Tabs.Panel>

            <Tabs.Panel value="about" className="space-y-4">
              <Textarea
                label="About"
                variant="filled"
                radius="md"
                minRows={4}
                autosize
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
            </Tabs.Panel>

            <Tabs.Panel value="skills" className="space-y-4">
              <TextInput
                label="Add Skill"
                variant="filled"
                radius="md"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newSkill.trim()) {
                    e.preventDefault();
                    if (!skills.includes(newSkill.trim())) {
                      setSkills([...skills, newSkill.trim()]);
                      setNewSkill("");
                    }
                  }
                }}
                classNames={{
                  input: "bg-mine-shaft-800 text-white border border-slate-700",
                  label: "text-yellow-400 font-semibold",
                }}
              />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-mine-shaft-800 text-gray-200 px-3 py-1 rounded-full text-sm border border-slate-700 hover:border-yellow-400 transition-all"
                  >
                    {skill}
                    <button
                      onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                      className="ml-2 text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </Tabs.Panel>
          </Tabs>

          <div className="px-6 pb-5">
            <Button
              onClick={handleSaveProfile}
              fullWidth
              radius="md"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      <div className="w-full max-w-4xl mx-auto mt-8 mb-16 bg-mine-shaft-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
        {/* Banner */}
        <div className="relative">
          <img className="w-full h-48 object-cover" src="/banner.png" alt="Banner" />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-mine-shaft-800 p-2 rounded-full">
              <IconShare size={18} className="text-yellow-400" />
            </button>
            <button className="bg-mine-shaft-800 p-2 rounded-full">
              <IconBookmark size={18} className="text-yellow-400" />
            </button>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-20 left-8">
            <div className="relative group">
              <img
                className="w-40 h-40 rounded-full border-6 border-mine-shaft-900 shadow-2xl object-cover ring-4 ring-yellow-400/20"
                src={avatar}
                alt="Avatar"
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <ActionIcon
                variant="filled"
                className="absolute bottom-2 right-2 bg-yellow-400 hover:bg-yellow-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <IconPencil size={16} />
              </ActionIcon>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  <IconStar size={12} className="mr-1" />
                  4.9
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Main */}
        <div className="pt-24 pb-8 px-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {profileData.name}
              </h2>
              <p className="text-lg text-yellow-400 font-semibold mt-1">{profileData.title}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <IconBriefcase size={16} className="mr-1.5 text-yellow-400" />
                  {profileData.experience}
                </div>
                <div className="flex items-center">
                  <IconCalendar size={16} className="mr-1.5 text-yellow-400" />
                  Available Now
                </div>
              </div>
            </div>
            <ActionIcon
              variant="subtle"
              color="yellow"
              radius="xl"
              size="lg"
              className="bg-mine-shaft-800 hover:bg-mine-shaft-700 p-2 transition hover:scale-110"
              onClick={() => setEditOpen(true)}
            >
              <IconPencil size={20} />
            </ActionIcon>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-300 mb-6 bg-mine-shaft-800/50 px-4 py-3 rounded-xl border border-slate-700/50">
            <IconMapPin className="h-5 w-5 mr-2 text-yellow-400" />
            <span className="font-medium">{profileData.location}</span>
            <span className="ml-auto text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              Open to Remote
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Projects", value: "127" },
              { label: "Followers", value: "2.3k" },
              { label: "Success Rate", value: "98%" },
            ].map(({ label, value }, i) => (
              <div
                key={i}
                className="bg-mine-shaft-800/50 p-4 rounded-xl text-center border border-slate-700/50 hover:border-yellow-400/30 transition"
              >
                <div className="text-2xl font-bold text-yellow-400">{value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 text-lg">About</h3>
            <div className="text-gray-300 text-sm leading-relaxed bg-mine-shaft-800/30 p-4 rounded-xl border border-slate-700/30">
              {about}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3 text-lg">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-mine-shaft-800 hover:bg-mine-shaft-700 text-gray-300 hover:text-white px-3 py-2 rounded-full text-sm border border-slate-700/50 hover:border-yellow-400/50 transition cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-sm px-6 py-3 rounded-xl transition hover:scale-105 active:scale-95">
              Connect Now
            </button>
            <button className="flex-1 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold text-sm px-6 py-3 rounded-xl transition hover:scale-105 active:scale-95">
              Send Message
            </button>
            <button className="bg-mine-shaft-800 hover:bg-mine-shaft-700 text-gray-300 hover:text-white px-4 py-3 rounded-xl border border-slate-700/50 hover:border-yellow-400/50">
              <IconBookmark size={18} />
            </button>
          </div>

          {/* Experience */}
          <h3 className="text-white font-semibold text-lg mb-4">Experience</h3>
          <ExpCard />

          {/* Certifications */}
          <h3 className="text-white font-semibold text-lg mb-4 mt-8">Certifications</h3>
          <CertificateCard />

          {/* Recommended Talent */}
          <h3 className="text-white font-semibold text-lg mb-4 mt-8">Recommended Talent</h3>
          <RecommendTalent />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;