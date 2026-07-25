import {
  createMission,
  findMissionById,
  findMissionsBySubplotId,
  findSubplotById,
  completeMission,
} from "./mission.repository.js";
import { addXp } from "../character/character.service.js";
import { checkAndCompleteSubplot } from "../subplot/subplot.service.js";

export async function listMissions(subplotId: string) {
  return findMissionsBySubplotId(subplotId);
}

export async function createNewMission(
  subplotId: string,
  data: { title: string; description?: string; xpReward: number }
) {
  const subplot = await findSubplotById(subplotId);
  if (!subplot) {
    throw new Error("SUBPLOT_NOT_FOUND");
  }

  if (data.xpReward < 1 || data.xpReward > 1000) {
    throw new Error("INVALID_XP_REWARD");
  }

  return createMission({
    subplotId,
    title: data.title,
    description: data.description,
    xpReward: data.xpReward,
  });
}

export async function completeMissionById(missionId: string, characterId: string) {
  const mission = await findMissionById(missionId);
  if (!mission) {
    throw new Error("MISSION_NOT_FOUND");
  }

  if (mission.status === "COMPLETED") {
    throw new Error("MISSION_ALREADY_COMPLETED");
  }

  const updated = await completeMission(missionId);
  await addXp(characterId, mission.xpReward);
  await checkAndCompleteSubplot(mission.subplotId, characterId);

  return updated;
}