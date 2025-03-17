'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { renderToStaticMarkup } from 'react-dom/server'
import { 
  FaDatabase, FaCalendar, FaTools, FaGlobe, FaRobot, FaServer, 
  FaChartLine, FaUser, FaMobile, FaCloud, FaCode, FaDesktop, 
  FaComments, FaMap, FaCamera, FaCar, FaUsers, FaFileAlt, 
  FaSearch, FaMicrophone, FaTree, FaWater, FaHeartbeat, 
  FaMapMarkerAlt, FaShoppingCart, FaChurch, FaLanguage, 
  FaImage, FaHeart, FaHotel, FaTrain, FaGraduationCap, 
  FaBus, FaShieldAlt, FaWifi, FaGamepad, FaSatellite, 
  FaFingerprint, FaLock, FaHospital, FaPlane, FaIndustry, 
  FaBook, FaCross, FaMoneyBill, FaUniversity, FaUtensils, 
  FaDollarSign, FaPrescriptionBottleAlt, FaHardHat, FaCloudSun, 
  FaMountain, FaDog, FaCat, FaDove, FaDumbbell, FaLightbulb, FaStar,
  FaFacebook, FaGithub, FaTiktok, FaTwitter, FaGoogle, 
  FaLinkedin, FaInstagram
} from 'react-icons/fa'

interface Node extends d3.SimulationNodeDatum {
  id: string
  icon: string
  x?: number
  y?: number
  color?: string
  clusterId: string
  isCore?: boolean
  size?: number
}

interface Link {
  source: string
  target: string
  clusterId: string
  value?: number
  color?: string
}

// Function to get color based on icon type
function getIconColor(iconName: string): string {
  switch(iconName) {
    // Blues
    case 'cloud': return '#4299E1' // sky blue
    case 'water': return '#3182CE' // blue
    case 'waves': return '#2B6CB0' // darker blue
    case 'airplane': return '#63B3ED' // light blue
    case 'plane': return '#63B3ED' // light blue
    case 'satellite': return '#2C5282' // deep blue
    case 'weather': return '#90CDF4' // very light blue
    case 'wifi': return '#4299E1' // sky blue
    
    // Reds
    case 'heart': return '#F56565' // red
    case 'healthcare': return '#E53E3E' // darker red
    case 'hospital': return '#C53030' // deep red
    case 'health': return '#FC8181' // light red
    case 'cross': return '#FEB2B2' // very light red
    
    // Greens
    case 'tree': return '#48BB78' // green
    case 'mountain': return '#38A169' // darker green
    case 'globe': return '#68D391' // light green
    case 'map': return '#9AE6B4' // very light green
    case 'map-marker': return '#2F855A' // deep green
    
    // Yellows/Golds
    case 'star': return '#ECC94B' // yellow
    case 'money': return '#D69E2E' // gold
    case 'currency': return '#F6E05E' // light yellow
    case 'bank': return '#B7791F' // dark gold
    case 'idea': return '#FAF089' // very light yellow
    case 'lightbulb': return '#FAF089' // very light yellow
    
    // Purples
    case 'robot': return '#805AD5' // purple
    case 'ai': return '#6B46C1' // darker purple
    case 'controller': return '#9F7AEA' // light purple
    case 'gamepad': return '#9F7AEA' // light purple
    
    // Oranges
    case 'cat': return '#ED8936' // orange
    case 'dog': return '#DD6B20' // darker orange
    case 'bird': return '#F6AD55' // light orange
    case 'dumbbells': return '#C05621' // deep orange
    
    // Browns
    case 'utensils': return '#A0522D' // brown
    case 'chef-hat': return '#8B4513' // dark brown
    
    // Pinks
    case 'camera': return '#D53F8C' // pink
    case 'image': return '#ED64A6' // light pink
    
    // Teals
    case 'database': return '#38B2AC' // teal
    case 'server': return '#319795' // darker teal
    case 'api': return '#4FD1C5' // light teal
    case 'code': return '#4FD1C5' // light teal
    
    // Grays
    case 'lock': return '#718096' // gray
    case 'shield': return '#4A5568' // darker gray
    case 'fingerprint': return '#A0AEC0' // light gray
    case 'construction': return '#2D3748' // very dark gray
    case 'hardhat': return '#2D3748' // very dark gray
    
    // Social Media Colors
    case 'facebook': return '#3B5998' // facebook blue
    case 'twitter': return '#1DA1F2' // twitter blue
    case 'instagram': return '#E1306C' // instagram pink/purple
    case 'linkedin': return '#0077B5' // linkedin blue
    case 'github': return '#333333' // github dark gray
    case 'google': return '#4285F4' // google blue
    case 'tiktok': return '#000000' // tiktok black
    
    // Other colors
    case 'user': return '#553C9A' // indigo
    case 'users': return '#6B46C1' // darker purple
    case 'car': return '#2C7A7B' // dark teal
    case 'train': return '#285E61' // darker teal
    case 'bus': return '#234E52' // darkest teal
    case 'tools': return '#702459' // dark pink
    case 'calendar': return '#97266D' // medium pink
    case 'search': return '#B83280' // light pink
    case 'microphone': return '#D53F8C' // lighter pink
    case 'chatbot': return '#667EEA' // indigo
    case 'display': return '#5A67D8' // darker indigo
    case 'mobile': return '#4C51BF' // darkest indigo
    case 'document': return '#7F9CF5' // light indigo
    case 'chart': return '#4C51BF' // darkest indigo
    case 'church': return '#744210' // dark yellow
    case 'translate': return '#975A16' // medium yellow
    case 'hotel': return '#B7791F' // light yellow
    case 'cap': return '#F6AD55' // light orange
    case 'book': return '#9C4221' // dark orange
    case 'pharmacy': return '#E53E3E' // red
    case 'cart': return '#C05621' // dark orange
    
    // Default
    default: return '#A0AEC0' // default gray
  }
}

export default function ForceGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove()

    // Get dimensions
    const width = window.innerWidth
    const height = window.innerHeight

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create a group for links that will be rendered first (below nodes)
    const linkGroup = svg.append('g')
      .attr('class', 'links')

    // Create a group for nodes that will be rendered second (above links)
    const nodeGroup = svg.append('g')
      .attr('class', 'nodes')

    // Create defs for gradients
    const defs = svg.append('defs')

    // Initialize node counter for unique IDs
    let nextNodeId = 0
    
    // Initialize arrays to store all nodes and links
    const nodes: Node[] = []
    const links: Link[] = []
    
    // Track active clusters
    const activeClusters = new Set<string>()
    
    // Available icon types for tools (excluding user and robot)
    const toolIcons = [
      'tools', 'server', 'database', 'globe', 'chart', 'mobile', 
      'cloud', 'api', 'display', 'chatbot', 'map', 'camera', 
      'car', 'document', 'search', 'microphone', 'calendar', 
      'tree', 'waves', 'health', 'map-marker', 'cart', 'church', 
      'translate', 'image', 'heart', 'hotel', 'train', 'cap', 
      'bus', 'shield', 'wifi', 'controller', 'satellite', 
      'fingerprint', 'lock', 'healthcare', 'airplane', 'book', 
      'cross', 'plane', 'money', 'bank', 'utensils', 'currency', 
      'pharmacy', 'hospital', 'construction', 'weather', 'mountain', 
      'dog', 'cat', 'bird', 'chef-hat', 'dumbbells', 'idea', 'star'
    ]
    
    // Function to create a random position on the screen
    const getRandomPosition = () => {
      // Keep positions away from the edges
      const margin = 100
      return {
        x: margin + Math.random() * (width - 2 * margin),
        y: margin + Math.random() * (height - 2 * margin)
      }
    }
    
    // Function to create a cluster
    const createCluster = (): { nodes: Node[], links: Link[] } => {
      const clusterId = Math.random().toString(36).substring(2, 9);
      const clusterNodes: Node[] = [];
      const clusterLinks: Link[] = [];
      const position = getRandomPosition();

      // Create a user node
      const userNode: Node = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        icon: 'user',
        clusterId,
        isCore: true,
        x: position.x + (Math.random() * 50 - 25),
        y: position.y + (Math.random() * 50 - 25),
        size: 20, // Increased size for core nodes
        color: '#4299E1' // Blue color for users
      };
      clusterNodes.push(userNode);

      // Create a robot node
      const robotNode: Node = {
        id: `robot-${Math.random().toString(36).substring(2, 9)}`,
        icon: 'robot',
        clusterId,
        isCore: true,
        x: position.x + (Math.random() * 50 - 25),
        y: position.y + (Math.random() * 50 - 25),
        size: 18, // Increased size for core nodes
        color: '#48BB78' // Green color for robots
      };
      clusterNodes.push(robotNode);

      // Create tool nodes
      const toolCount = Math.floor(Math.random() * 3) + 3; // 3-5 tools
      for (let i = 0; i < toolCount; i++) {
        const toolNode: Node = {
          id: `tool-${Math.random().toString(36).substring(2, 9)}`,
          icon: toolIcons[Math.floor(Math.random() * toolIcons.length)],
          clusterId,
          isCore: false,
          x: position.x + (Math.random() * 100 - 50),
          y: position.y + (Math.random() * 100 - 50),
          size: 12, // Standard size for tool nodes
          color: '#ED8936' // Orange color for tools
        };
        clusterNodes.push(toolNode);
      }

      // Connect user to robot
      clusterLinks.push({
        source: userNode.id,
        target: robotNode.id,
        clusterId,
        value: 3, // Stronger connection between core nodes
        color: `url(#gradient-${userNode.id}-${robotNode.id})` // Will use gradient
      });

      // Connect robot to one random tool initially
      const randomTool = clusterNodes.filter(n => !n.isCore)[Math.floor(Math.random() * (clusterNodes.length - 2))];
      clusterLinks.push({
        source: robotNode.id,
        target: randomTool.id,
        clusterId,
        value: 2, // Medium strength connection
        color: `url(#gradient-${robotNode.id}-${randomTool.id})` // Will use gradient
      });

      return { nodes: clusterNodes, links: clusterLinks };
    }
    
    // Function to remove a cluster
    const removeCluster = (clusterId: string) => {
      // Find all nodes in this cluster
      const clusterNodeIds = nodes
        .filter(node => node.clusterId === clusterId)
        .map(node => node.id)
      
      // Remove all links in this cluster
      for (let i = links.length - 1; i >= 0; i--) {
        if (links[i].clusterId === clusterId) {
          links.splice(i, 1)
        }
      }
      
      // Remove all nodes in this cluster
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].clusterId === clusterId) {
          nodes.splice(i, 1)
        }
      }
      
      activeClusters.delete(clusterId)
    }
    
    // Function to add a new connection to a cluster
    const addConnectionToCluster = (clusterId: string) => {
      const clusterNodes = nodes.filter(node => node.clusterId === clusterId)
      
      if (clusterNodes.length < 2) return
      
      // Pick two random nodes from the cluster
      const randomIndex1 = Math.floor(Math.random() * clusterNodes.length)
      let randomIndex2 = Math.floor(Math.random() * clusterNodes.length)
      
      // Make sure we don't pick the same node twice
      while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * clusterNodes.length)
      }
      
      const source = clusterNodes[randomIndex1]
      const target = clusterNodes[randomIndex2]
      
      // Check if this connection already exists
      const connectionExists = links.some(link => 
        (link.source === source.id && link.target === target.id) ||
        (link.source === target.id && link.target === source.id)
      )
      
      if (!connectionExists) {
        links.push({
          source: source.id,
          target: target.id,
          clusterId
        })
      }
    }
    
    // Function to remove connections from a cluster
    const removeConnectionsFromCluster = (clusterId: string, count: number) => {
      const clusterLinks = links.filter(link => link.clusterId === clusterId)
      
      if (clusterLinks.length <= count) return
      
      // Remove random connections
      for (let i = 0; i < count; i++) {
        if (clusterLinks.length === 0) break
        
        const randomIndex = Math.floor(Math.random() * clusterLinks.length)
        const linkToRemove = clusterLinks[randomIndex]
        
        // Find and remove this link from the main links array
        const mainIndex = links.findIndex(
          link => link.source === linkToRemove.source && link.target === linkToRemove.target
        )
        
        if (mainIndex !== -1) {
          links.splice(mainIndex, 1)
        }
        
        // Remove from our tracking array too
        clusterLinks.splice(randomIndex, 1)
      }
    }
    
    // Create initial clusters
    for (let i = 0; i < 5; i++) {
      const { nodes: clusterNodes, links: clusterLinks } = createCluster()
      nodes.push(...clusterNodes)
      links.push(...clusterLinks)
    }
    
    // Create a simulation with forces
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))
      .force('x', d3.forceX(width / 2).strength(0.005))
      .force('y', d3.forceY(height / 2).strength(0.005))
      .alphaTarget(0.05)
      .alphaDecay(0.01)
    
    // Function to update the visualization
    const updateVisualization = () => {
      // Create gradients for links
      const defs = svg.select('defs');
      defs.selectAll('*').remove(); // Clear existing gradients
      
      links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source) || { color: '#ccc', id: 'placeholder' };
        const targetNode = nodes.find(n => n.id === link.target) || { color: '#ccc', id: 'placeholder' };
        
        const gradient = defs.append('linearGradient')
          .attr('id', `gradient-${sourceNode.id}-${targetNode.id}`)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', (sourceNode as Node).x || 0)
          .attr('y1', (sourceNode as Node).y || 0)
          .attr('x2', (targetNode as Node).x || 0)
          .attr('y2', (targetNode as Node).y || 0);
          
        gradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', sourceNode.color || '#ccc');
          
        gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', targetNode.color || '#ccc');
        
        // Update link color to use gradient
        link.color = `url(#gradient-${sourceNode.id}-${targetNode.id})`;
      });

      // Update links
      const link = svg.select('.links')
        .selectAll('line')
        .data(links, (d: any) => `${d.source}-${d.target}`);

      link.exit().remove();

      const linkEnter = link.enter()
        .append('line')
        .attr('stroke-width', d => d.value || 1)
        .attr('stroke-opacity', 0.6)
        .attr('stroke', d => d.color || '#999');

      const linkMerge = linkEnter.merge(link as any)
        .attr('stroke-width', d => d.value || 1)
        .attr('stroke', d => d.color || '#999');

      // Update nodes
      const node = svg.select('.nodes')
        .selectAll('g')
        .data(nodes, (d: any) => d.id);

      node.exit().remove();

      const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag<any, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      // Add circles for nodes with dynamic sizing based on isCore
      nodeEnter.append('circle')
        .attr('r', d => d.size || (d.isCore ? 15 : 10))
        .attr('fill', d => d.color || (d.isCore ? '#4299E1' : '#ED8936'))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);

      // Add icons
      nodeEnter.each(function(d) {
        const iconGroup = d3.select(this)
        
        // Create a foreignObject to embed React Icons
        const fo = iconGroup.append('foreignObject')
          .attr('width', 40)
          .attr('height', 40)
          .attr('x', -20)
          .attr('y', -20)
          .style('pointer-events', 'none')
        
        // Create a div inside the foreignObject
        const div = fo.append('xhtml:div')
          .style('width', '100%')
          .style('height', '100%')
          .style('display', 'flex')
          .style('align-items', 'center')
          .style('justify-content', 'center')
        
        // Create a div for the icon
        const iconElement = document.createElement('div')
        iconElement.style.color = d.color || 'rgba(85, 85, 85, 0.2)'
        iconElement.style.fontSize = d.isCore ? '24px' : '22px'
        iconElement.style.opacity = d.isCore ? '0.5' : '0.4'
        
        // Map icon names to React Icons components
        let iconSvg
        switch(d.icon) {
          case 'database':
            iconSvg = renderToStaticMarkup(<FaDatabase />)
            break
          case 'calendar':
            iconSvg = renderToStaticMarkup(<FaCalendar />)
            break
          case 'tools':
            iconSvg = renderToStaticMarkup(<FaTools />)
            break
          case 'globe':
            iconSvg = renderToStaticMarkup(<FaGlobe />)
            break
          case 'robot':
            iconSvg = renderToStaticMarkup(<FaRobot />)
            break
          case 'server':
            iconSvg = renderToStaticMarkup(<FaServer />)
            break
          case 'chart':
            iconSvg = renderToStaticMarkup(<FaChartLine />)
            break
          case 'user':
            iconSvg = renderToStaticMarkup(<FaUser />)
            break
          case 'mobile':
            iconSvg = renderToStaticMarkup(<FaMobile />)
            break
          case 'cloud':
            iconSvg = renderToStaticMarkup(<FaCloud />)
            break
          case 'api':
            iconSvg = renderToStaticMarkup(<FaCode />)
            break
          case 'display':
            iconSvg = renderToStaticMarkup(<FaDesktop />)
            break
          case 'chatbot':
            iconSvg = renderToStaticMarkup(<FaComments />)
            break
          case 'map':
            iconSvg = renderToStaticMarkup(<FaMap />)
            break
          case 'camera':
            iconSvg = renderToStaticMarkup(<FaCamera />)
            break
          case 'car':
            iconSvg = renderToStaticMarkup(<FaCar />)
            break
          case 'users':
            iconSvg = renderToStaticMarkup(<FaUsers />)
            break
          case 'document':
            iconSvg = renderToStaticMarkup(<FaFileAlt />)
            break
          case 'search':
            iconSvg = renderToStaticMarkup(<FaSearch />)
            break
          case 'microphone':
            iconSvg = renderToStaticMarkup(<FaMicrophone />)
            break
          case 'tree':
            iconSvg = renderToStaticMarkup(<FaTree />)
            break
          case 'waves':
            iconSvg = renderToStaticMarkup(<FaWater />)
            break
          case 'health':
            iconSvg = renderToStaticMarkup(<FaHeartbeat />)
            break
          case 'map-marker':
            iconSvg = renderToStaticMarkup(<FaMapMarkerAlt />)
            break
          case 'cart':
            iconSvg = renderToStaticMarkup(<FaShoppingCart />)
            break
          case 'church':
            iconSvg = renderToStaticMarkup(<FaChurch />)
            break
          case 'translate':
            iconSvg = renderToStaticMarkup(<FaLanguage />)
            break
          case 'image':
            iconSvg = renderToStaticMarkup(<FaImage />)
            break
          case 'heart':
            iconSvg = renderToStaticMarkup(<FaHeart />)
            break
          case 'hotel':
            iconSvg = renderToStaticMarkup(<FaHotel />)
            break
          case 'train':
            iconSvg = renderToStaticMarkup(<FaTrain />)
            break
          case 'cap':
            iconSvg = renderToStaticMarkup(<FaGraduationCap />)
            break
          case 'bus':
            iconSvg = renderToStaticMarkup(<FaBus />)
            break
          case 'shield':
            iconSvg = renderToStaticMarkup(<FaShieldAlt />)
            break
          case 'wifi':
            iconSvg = renderToStaticMarkup(<FaWifi />)
            break
          case 'controller':
            iconSvg = renderToStaticMarkup(<FaGamepad />)
            break
          case 'satellite':
            iconSvg = renderToStaticMarkup(<FaSatellite />)
            break
          case 'fingerprint':
            iconSvg = renderToStaticMarkup(<FaFingerprint />)
            break
          case 'lock':
            iconSvg = renderToStaticMarkup(<FaLock />)
            break
          case 'healthcare':
            iconSvg = renderToStaticMarkup(<FaHospital />)
            break
          case 'airplane':
            iconSvg = renderToStaticMarkup(<FaPlane />)
            break
          case 'book':
            iconSvg = renderToStaticMarkup(<FaBook />)
            break
          case 'cross':
            iconSvg = renderToStaticMarkup(<FaCross />)
            break
          case 'plane':
            iconSvg = renderToStaticMarkup(<FaPlane />)
            break
          case 'money':
            iconSvg = renderToStaticMarkup(<FaMoneyBill />)
            break
          case 'bank':
            iconSvg = renderToStaticMarkup(<FaUniversity />)
            break
          case 'utensils':
            iconSvg = renderToStaticMarkup(<FaUtensils />)
            break
          case 'currency':
            iconSvg = renderToStaticMarkup(<FaDollarSign />)
            break
          case 'pharmacy':
            iconSvg = renderToStaticMarkup(<FaPrescriptionBottleAlt />)
            break
          case 'hospital':
            iconSvg = renderToStaticMarkup(<FaHospital />)
            break
          case 'construction':
            iconSvg = renderToStaticMarkup(<FaHardHat />)
            break
          case 'weather':
            iconSvg = renderToStaticMarkup(<FaCloudSun />)
            break
          case 'mountain':
            iconSvg = renderToStaticMarkup(<FaMountain />)
            break
          case 'dog':
            iconSvg = renderToStaticMarkup(<FaDog />)
            break
          case 'cat':
            iconSvg = renderToStaticMarkup(<FaCat />)
            break
          case 'bird':
            iconSvg = renderToStaticMarkup(<FaDove />)
            break
          case 'chef-hat':
            iconSvg = renderToStaticMarkup(<FaUtensils />)  // Using utensils as substitute
            break
          case 'dumbbells':
            iconSvg = renderToStaticMarkup(<FaDumbbell />)
            break
          case 'idea':
            iconSvg = renderToStaticMarkup(<FaLightbulb />)
            break
          case 'star':
            iconSvg = renderToStaticMarkup(<FaStar />)
            break
          case 'facebook':
            iconSvg = renderToStaticMarkup(<FaFacebook />)
            break
          case 'github':
            iconSvg = renderToStaticMarkup(<FaGithub />)
            break
          case 'tiktok':
            iconSvg = renderToStaticMarkup(<FaTiktok />)
            break
          case 'twitter':
            iconSvg = renderToStaticMarkup(<FaTwitter />)
            break
          case 'ai':
            iconSvg = renderToStaticMarkup(<FaRobot />)  // Using robot icon for AI
            break
          case 'google':
            iconSvg = renderToStaticMarkup(<FaGoogle />)
            break
          case 'linkedin':
            iconSvg = renderToStaticMarkup(<FaLinkedin />)
            break
          case 'instagram':
            iconSvg = renderToStaticMarkup(<FaInstagram />)
            break
          default:
            iconSvg = renderToStaticMarkup(<FaGlobe />)
        }
        
        iconElement.innerHTML = iconSvg
        const divNode = div.node() as HTMLElement
        if (divNode) {
          divNode.appendChild(iconElement)
        }
      })
      
      // Merge enter and update selections
      const nodeMerge = nodeEnter.merge(node as any)
      
      // Update the simulation on tick
      simulation.on('tick', () => {
        // Update gradients as nodes move
        links.forEach((d: any) => {
          const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
          const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
          
          if (!source || !target) return
          
          if (source.color && target.color) {
            svg.select(`#gradient-${source.id}-${target.id}`)
              .attr('x1', source.x || 0)
              .attr('y1', source.y || 0)
              .attr('x2', target.x || 0)
              .attr('y2', target.y || 0)
          }
        })
        
        // Calculate line endpoints to stop at node boundaries
        linkMerge
          .attr('x1', (d: any) => {
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
            const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
            
            if (!source || !target) return 0
            
            // Get the direction vector
            const dx = target.x! - source.x!
            const dy = target.y! - source.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            // If nodes are on top of each other, just return the source position
            if (dr === 0) return source.x!
            
            // Calculate the point on the edge of the source node
            const radius = source.isCore ? 30 : 25
            return source.x! + dx * radius / dr
          })
          .attr('y1', (d: any) => {
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
            const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
            
            if (!source || !target) return 0
            
            const dx = target.x! - source.x!
            const dy = target.y! - source.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return source.y!
            
            const radius = source.isCore ? 30 : 25
            return source.y! + dy * radius / dr
          })
          .attr('x2', (d: any) => {
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
            const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
            
            if (!source || !target) return 0
            
            const dx = source.x! - target.x!
            const dy = source.y! - target.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return target.x!
            
            const radius = target.isCore ? 30 : 25
            return target.x! + dx * radius / dr
          })
          .attr('y2', (d: any) => {
            const source = typeof d.source === 'object' ? d.source : nodes.find(n => n.id === d.source)
            const target = typeof d.target === 'object' ? d.target : nodes.find(n => n.id === d.target)
            
            if (!source || !target) return 0
            
            const dx = source.x! - target.x!
            const dy = source.y! - target.y!
            const dr = Math.sqrt(dx * dx + dy * dy)
            
            if (dr === 0) return target.y!
            
            const radius = target.isCore ? 30 : 25
            return target.y! + dy * radius / dr
          })
        
        nodeMerge
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
      })
      
      // Update the simulation with new nodes and links
      simulation.nodes(nodes)
      simulation.force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      simulation.alpha(0.3).restart()
    }
    
    // Initial visualization update
    updateVisualization()
    
    // Function to evolve the network
    const evolveNetwork = () => {
      // For each active cluster
      activeClusters.forEach(clusterId => {
        // Count connections in this cluster
        const clusterLinks = links.filter(link => link.clusterId === clusterId)
        const connectionCount = clusterLinks.length
        
        // Growth phase: When fewer than 6 connections, add more than remove
        if (connectionCount < 6) {
          // Add 2-3 new connections
          const addCount = Math.floor(Math.random() * 2) + 2 // 2-3 connections
          for (let i = 0; i < addCount; i++) {
            addConnectionToCluster(clusterId)
          }
          
          // Remove 1-2 connections
          const removeCount = Math.floor(Math.random() * 2) + 1 // 1-2 connections
          removeConnectionsFromCluster(clusterId, removeCount)
        } 
        // Shrink phase: When 6 or more connections, remove more than add
        else {
          // Remove 2-3 connections
          const removeCount = Math.floor(Math.random() * 2) + 2 // 2-3 connections
          removeConnectionsFromCluster(clusterId, removeCount)
          
          // Add 1-2 new connections
          const addCount = Math.floor(Math.random() * 2) + 1 // 1-2 connections
          for (let i = 0; i < addCount; i++) {
            addConnectionToCluster(clusterId)
          }
        }
      })
      
      // Randomly remove a cluster and create a new one
      if (Math.random() < 0.1) { // 10% chance each second
        if (activeClusters.size > 0) {
          // Pick a random cluster to remove
          const clusterArray = Array.from(activeClusters)
          const clusterToRemove = clusterArray[Math.floor(Math.random() * clusterArray.length)]
          
          removeCluster(clusterToRemove)
          const { nodes: newNodes, links: newLinks } = createCluster()
          nodes.push(...newNodes)
          links.push(...newLinks)
        }
      }
      
      // Ensure we always have 5 clusters
      while (activeClusters.size < 5) {
        const { nodes: newNodes, links: newLinks } = createCluster()
        nodes.push(...newNodes)
        links.push(...newLinks)
      }
      
      // Update the visualization
      updateVisualization()
    }
    
    // Evolve the network every second
    const evolutionInterval = setInterval(evolveNetwork, 1000)
    
    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }
    
    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }
    
    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      svg.attr('width', width).attr('height', height)
      simulation.force('center', d3.forceCenter(width / 2, height / 2))
      simulation.alpha(0.3).restart()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      simulation.stop()
      clearInterval(evolutionInterval)
    }
  }, [])

  return (
    <svg 
      ref={svgRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'block',
        background: 'transparent'
      }}
    />
  )
} 